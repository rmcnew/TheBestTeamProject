use strict;
use warnings;

# read in lookup table
my $lookupTableHandle;
my %lookupTable;

open($lookupTableHandle, "<", "lookupTable.csv") or die("Cannot open lookup table!");
foreach my $lookupLine (<$lookupTableHandle>) {
    chomp($lookupLine);
    $lookupLine =~ /"(.*)","(.*)","(.*)","(.*)"/;
    my $city = $1;
    my $state = $2;
    my $lat = $3;
    my $lng = $4;
    $lookupTable{"${city}_${state}"} = "${lat}_${lng}";
}
close($lookupTableHandle);
#print("Test lookup:  Mukilteo, WA = $lookupTable{'Mukilteo_WA'}\n"); 

# open the output file
my $outputHandle;
open($outputHandle, ">", "data.tsv") or die("Cannot open output file!");

# open the notFound file
my $notFoundHandle;
open($notFoundHandle, ">", "notFound.tsv") or die("Cannot open notFound file!");

# open the dataDump file
my $inputHandle;
open($inputHandle, "<", "dataDump.tsv") or die("Cannot open input file!");
foreach my $line (<$inputHandle>) {
    chomp($line);
    # Sighting_Occurred|Sighting_Reported|Sighting_Location|UFO_Shape|Sighting_Duration|Sighting_Narrative
    $line =~ /(.*)\|(.*)\|(.*)\|(.*)\|(.*)\|(.*)/;
    my $sightingOccurred = $1;
    my $sightingReported = $2;
    my $sightingLocation = $3;
    my $ufoShape = $4;
    my $sightingDuration = $5;
    my $sightingNarrative = $6;
    #print("sightingOccurred=$sightingOccurred, sightingReported=$sightingReported, sightingLocation=$sightingLocation, ufoShape=$ufoShape, sightingDuration=$sightingDuration, sightingNarrative=$sightingNarrative\n");
    if ($sightingLocation) {
        $sightingLocation =~ /(.*), (\w+)/;
        my $locationCity = $1;
        my $locationState = $2;
        #print("locationCity=$locationCity, locationState=$locationState\n");
        my $latLong = $lookupTable{"${locationCity}_${locationState}"};
        if ($latLong) {
           $latLong =~ /(.*)_(.*)/; 
           my $lat = $1;
           my $lng = $2;
           #print("lat=$lat, lng=$lng\n");
           print $outputHandle  "$sightingOccurred|$sightingReported|$sightingLocation|$lat|$lng|$ufoShape|$sightingDuration|$sightingNarrative\n";
        } else {
           print $notFoundHandle "$sightingOccurred|$sightingReported|$sightingLocation|$ufoShape|$sightingDuration|$sightingNarrative\n";
        }
    }
}

close($inputHandle);
close($outputHandle);
close($notFoundHandle);
