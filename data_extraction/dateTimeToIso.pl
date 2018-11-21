use strict;
use warnings;

my $dateRegexNoCapture = qr/\d+\/\d+\/\d+ \d+:\d+ (?:AM|PM)/;
my $dateRegex = qr/(\d+)\/(\d+)\/(\d+) (\d+):(\d+) (AM|PM)/;

sub dateToIso {
    my $dateIn = shift;
    #print "dateIn is: $dateIn\n";
    $dateIn =~ /$dateRegex/;
    my $hour = int($4);
    if ($6 eq "PM") {
       $hour += 12; 
    }
    my $year = int($3);
    if ($year < 19) {
        $year += 2000;
    } else {
        $year += 1900;
    }
    return sprintf("%d-%02d-%02dT%02d:%02d" ,$year, $1, $2, $hour, $5);
}

sub normalizeDuration {
    my ($hour, $minute, $second) = @_;
    if ($second > 60) {
        my $minutesFromSeconds = $second / 60.0;
        $second -= ($minutesFromSeconds * 60);
        $minute += $minutesFromSeconds;
    }
    if ($minute > 60) {
        my $hoursFromMinutes = $minute / 60.0;
        $minute -= ($hoursFromMinutes * 60);
        $hour += $hoursFromMinutes;
    }
    return sprintf("%02d:%02d:%02d", $hour, $minute, $second);
}

sub cleanDuration {
    my $dur = shift;
    my $seconds = 0;
    my $minutes = 0;
    my $hours = 0;
    if ($dur =~ /[Ss]econds/) {
        $seconds += 5;
    } elsif ($dur =~ /[Mm]inutes/) {
        $minutes += 5;
    } elsif ($dur =~ /[Hh]ours/) {
        $hours += 2;
    } elsif ($dur =~ /(\d+)\s+(\w+)/) {
        my $value = int($1);
        my $unit = $2;
        if ($unit =~ /[Ss]ec(?:ond)?s?/ ) {
            $seconds += $value;
        } elsif ($unit =~ /[Mm]in(?:ute)?s?/) {
            $minutes += $value; 
        } elsif ($unit =~ /[Hh]ours?/) {
            $hours += $value;
        }
    } elsif ($dur =~ /(\d+)-(\d+)\s+(\w+)/) {
        my $startValue = int($1);
        my $endValue = int($2);
        my $value = ($startValue + $endValue) / 2.0;
        my $unit = $3;
        if ($unit =~ /[Ss]ec(?:ond)?s?/ ) {
            $seconds += $value;
        } elsif ($unit =~ /[Mm]in(?:ute)?s?/) {
            $minutes += $value; 
        } elsif ($unit =~ /[Hh]ours?/) {
            $hours += $value;
        }
    }

    return normalizeDuration($hours, $minutes, $seconds);
}

# open the output file
my $outputHandle;
open($outputHandle, ">", "dataIso.csv") or die("Cannot open output file!");
# open the input file
my $inputHandle;
open($inputHandle, "<", "data.csv") or die("Cannot open input file!");
foreach my $line (<$inputHandle>) {
    chomp($line);
    next if ($line =~ "^Occurred.*");
    # Occurred,Reported,Location,Latitude,Longitude,Shape,Duration,Narrative
    $line =~ /($dateRegexNoCapture),($dateRegexNoCapture),(".*"),(.*),(.*),(.*),(.*),(.*)/;
    my $occurred = $1;
    my $reported = $2;
    my $location = $3;
    my $latitude = $4;
    my $longitude = $5;
    my $shape = $6;
    my $duration = $7;
    my $narrative = $8;
    unless ($shape) {
        $shape = "Other";
    }
    if ($shape =~ /[Uu]nknown/) {
        $shape = "Other";
    }
    #if ($duration) {
    #    $duration = cleanDuration($duration);
    #}
    if ($occurred && $reported) {
        my $isoOccurred = dateToIso($occurred);
        my $isoReported = dateToIso($reported);
        print $outputHandle "$isoOccurred,$isoReported,$location,$latitude,$longitude,$shape,$duration,$narrative\n";
    }
}

close($inputHandle);
close($outputHandle);
