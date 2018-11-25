use strict;
use warnings;
use Time::Piece;

# open the output file
my $outputHandle;
open($outputHandle, ">", "dataEpoch.tsv") or die("Cannot open output file!");
# open the input file
my $inputHandle;
open($inputHandle, "<", "data.tsv") or die("Cannot open input file!");

my $id = 1;

foreach my $line (<$inputHandle>) {
    chomp($line);
    next if ($line =~ "^Occurred.*");
    # Occurred,Reported,Location,Latitude,Longitude,Shape,Duration,Narrative
    $line =~ /(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)/;
    my $occurred = $1;
    my $reported = $2;
    my $location = $3;
    my $latitude = $4;
    my $longitude = $5;
    my $shape = $6;
    my $duration = $7;
    my $narrative = $8;
    print "occurred: $occurred,  reported: $reported\n";
    my $occurred_epoch = Time::Piece->strptime("$occurred", "%Y-%m-%dT%H:%M");
    my $reported_epoch = Time::Piece->strptime("$reported", "%Y-%m-%dT%H:%M");
    print "occurred_epoch: $occurred_epoch->epoch, reported_epoch: $reported_epoch->epoch\n";

    print $outputHandle "$id\t$occurred\t$occurred_epoch->epoch\t$reported\t$reported_epoch->epoch\t$location\t$latitude\t$longitude\t$shape\t$duration\t$narrative\n";
    $id++;
}

close($inputHandle);
close($outputHandle);
