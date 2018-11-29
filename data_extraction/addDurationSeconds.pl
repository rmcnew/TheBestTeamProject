use strict;
use warnings;

# open the output file
my $outputHandle;
open($outputHandle, ">", "dataDurationSeconds.tsv") or die("Cannot open output file!");
# open the input file
my $inputHandle;
open($inputHandle, "<", "data.tsv") or die("Cannot open input file!");

my $id = 1;

print $outputHandle "ID\tOCCURRED\tOCCURRED_EPOCH\tREPORTED\tREPORTED_EPOCH\tLOCATION\tLATITUDE\tLONGITUDE\tSHAPE\tDURATION\tDURATION_SECONDS\tNARRATIVE\n";
foreach my $line (<$inputHandle>) {
    chomp($line);
    next if ($line =~ /^ID\tOCCURRED.*/);
    #ID\tOCCURRED\tOCCURRED_EPOCH\tREPORTED\tREPORTED_EPOCH\tLOCATION\tLATITUDE\tLONGITUDE\tSHAPE\tDURATION\tNARRATIVE\n
    $line =~ /^\d+\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)$/;
    my $occurred = $1;
    my $occurred_epoch = $2;
    my $reported = $3;
    my $reported_epoch = $4;
    my $location = $5;
    my $latitude = $6;
    my $longitude = $7;
    my $shape = $8;
    my $duration = $9;
    my $narrative = $10;
    $duration =~ /(\d+)\:(\d+)\:(\d+)/;
    my $hours = $1;
    my $minutes = $2;
    my $seconds = $3;
    my $duration_seconds = (int($hours) * 3600) + (int($minutes) * 60) + int($seconds);
    print $outputHandle "$id\t$occurred\t$occurred_epoch\t$reported\t$reported_epoch\t$location\t$latitude\t$longitude\t$shape\t$duration\t$duration_seconds\t$narrative\n";
    $id++;
}

close($inputHandle);
close($outputHandle);
