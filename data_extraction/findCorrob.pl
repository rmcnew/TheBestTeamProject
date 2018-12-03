use strict;
use warnings;
use DBI;
use Set::Scalar;

# code to calculate distance between two latlongs from https://www.geodatasource.com/developers/perl
# The code is licensed under LGPLv3.

my $pi = atan2(1,1) * 4;
#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
#:::  This function get the arccos function using arctan function   :::
#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
sub acos {
  my ($rad) = @_;
  my $ret = atan2(sqrt(1 - $rad**2), $rad);
  return $ret;
}

#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
#:::  This function converts decimal degrees to radians             :::
#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
sub deg2rad {
  my ($deg) = @_;
  return ($deg * $pi / 180);
}

#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
#:::  This function converts radians to decimal degrees             :::
#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
sub rad2deg {
  my ($rad) = @_;
  return ($rad * 180 / $pi);
}
#:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
#:::                                                                         :::
#:::  This routine calculates the distance between two points (given the     :::
#:::  latitude/longitude of those points). It is being used to calculate     :::
#:::  the distance between two locations using GeoDataSource(TM) products    :::
#:::                                                                         :::
#:::  Definitions:                                                           :::
#:::    South latitudes are negative, east longitudes are positive           :::
#:::                                                                         :::
#:::  Passed to function:                                                    :::
#:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
#:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
#:::    unit = the unit you desire for results                               :::
#:::           where: 'M' is statute miles (default)                         :::
#:::                  'K' is kilometers                                      :::
#:::                  'N' is nautical miles                                  :::
#:::                                                                         :::
#:::  Worldwide cities and other features databases with latitude longitude  :::
#:::  are available at https://www.geodatasource.com	                     :::
#:::                                                                         :::
#:::  For enquiries, please contact sales@geodatasource.com                  :::
#:::                                                                         :::
#:::  Official Web site: https://www.geodatasource.com                       :::
#:::                                                                         :::
#:::            GeoDataSource.com (C) All Rights Reserved 2018               :::
#:::                                                                         :::
#:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

sub distance {
  my ($lat1, $lon1, $lat2, $lon2, $unit) = @_;
  if (($lat1 == $lat2) && ($lon1 == $lon2)) {
    return 0;
  }
  else {
    my $theta = $lon1 - $lon2;
    my $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
    $dist  = acos($dist);
    $dist = rad2deg($dist);
    $dist = $dist * 60 * 1.1515;
    if ($unit eq "K") {
      $dist = $dist * 1.609344;
    } elsif ($unit eq "N") {
      $dist = $dist * 0.8684;
    }
    return ($dist);
  }
}

## The Best Team code starts here

my %corrob;
# open the sqlite database
my $dbh = DBI->connect('dbi:SQLite:dbname=data.sqlite','','',{AutoCommit=>1,
                                                              RaiseError=>1,
                                                              PrintError=>0, 
                                                              sqlite_open_flags=>"SQLITE_OPEN_READONLY"});

my $currentRowStatement = $dbh->prepare('SELECT * FROM UFO_REPORTS WHERE ID = ?');                                                    
my $searchStatement = $dbh->prepare('SELECT * FROM UFO_REPORTS WHERE OCCURRED_EPOCH >= ? AND OCCURRED_EPOCH <= ? AND ID != ?');
my $LAST_ID = 43634;  # the last row in the database

my $MAX_DISTANCE_BETWEEN_REPORTS = 5; # miles
my $MAX_TIME_BETWEEN_REPORTS = 300; # seconds == 5 minutes

my $currentRow;
my $temporallyCloseRow;
# "When in doubt, use brute force"  --Ken Thompson
for (my $id = 1; $id <= $LAST_ID; $id++) {
    # get the details for the current row
    $currentRowStatement->execute($id);
    # ID    OCCURRED    OCCURRED_EPOCH  REPORTED    REPORTED_EPOCH  LOCATION    LATITUDE    LONGITUDE   SHAPE   DURATION    DURATION_SECONDS    NARRATIVE
    $currentRow = $currentRowStatement->fetchrow_hashref();
	my $currentOccurredEpoch = $$currentRow{'OCCURRED_EPOCH'};
	my $currentLatitude = $$currentRow{'LATITUDE'};
	my $currentLongitude = $$currentRow{'LONGITUDE'};
	my $currentShape = $$currentRow{'SHAPE'};

	# get all the UFO reports within $timeBetweenSighings time of the currentRow report
	$searchStatement->execute($currentOccurredEpoch - $MAX_TIME_BETWEEN_REPORTS, $currentOccurredEpoch + $MAX_TIME_BETWEEN_REPORTS, $id);
	while ($temporallyCloseRow = $searchStatement->fetchrow_hashref()) {
		my $temporallyCloseId = $$temporallyCloseRow{'ID'};
		my $temporallyCloseOccurredEpoch = $$temporallyCloseRow{'OCCURRED_EPOCH'};
		my $temporallyCloseLatitude = $$temporallyCloseRow{'LATITUDE'};
		my $temporallyCloseLongitude = $$temporallyCloseRow{'LONGITUDE'};
		my $temporallyCloseShape = $$temporallyCloseRow{'SHAPE'};
		my $distanceBetweenReports = distance($currentLatitude, $currentLongitude, $temporallyCloseLatitude, $temporallyCloseLongitude, 'M');
		if (($distanceBetweenReports <= $MAX_DISTANCE_BETWEEN_REPORTS) && ($currentShape eq $temporallyCloseShape)) {
			# print "$temporallyCloseId on $temporallyCloseOccurredEpoch at ($temporallyCloseLatitude, $temporallyCloseLongitude) may corroborate:  $id on $currentOccurredEpoch at ($currentLatitude, $currentLongitude)\n";
			if (exists $corrob{$id}) { # there is already an entry for this report
                my $corrobSet = $corrob{$id};
				$corrobSet->insert($temporallyCloseId);
			} else { # no previous entries exist, create a new one
				my $corrobSet = Set::Scalar->new;
				$corrobSet->insert($temporallyCloseId);
				$corrob{$id} = $corrobSet;
			}
		}
	}
}

# print out results
foreach my $key (sort {$a <=> $b} keys %corrob) {
	my $set = $corrob{$key};
    my @setMembers = $set->members;
	print "$key\t@setMembers\n";
} 
