use strict;
use warnings;

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
    print "cleanDuration args in:  $dur\n";
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
        print("value: $value, unit: $unit\n");
        if ($unit =~ /sec(?:ond)?s?\.?/i ) {
            $seconds += $value;
        } elsif ($unit =~ /min(?:ute)?s?\.?/i) {
            $minutes += $value; 
        } elsif ($unit =~ /h(?:ou)?rs?\.?/i) {
            $hours += $value;
        }
    } elsif ($dur =~ /(\d+)-(\d+)\s+(\w+)/) {
        my $startValue = int($1);
        my $endValue = int($2);
        my $unit = $3;
        print("start value: $startValue, end value: $endValue, unit: $unit\n");
        my $value = ($startValue + $endValue) / 2.0;
        if ($unit =~ /sec(?:ond)?s?\.?/i ) {
            $seconds += $value;
        } elsif ($unit =~ /min(?:ute)?s?\.?/i) {
            $minutes += $value; 
        } elsif ($unit =~ /h(?:ou)?rs?\.?/i) {
            $hours += $value;
        }
    }

    return normalizeDuration($hours, $minutes, $seconds);
}

# open the output file
my $outputHandle;
open($outputHandle, ">", "dataIso.tsv") or die("Cannot open output file!");
# open the input file
my $inputHandle;
open($inputHandle, "<", "dataSmall.tsv") or die("Cannot open input file!");
foreach my $line (<$inputHandle>) {
    chomp($line);
    next if ($line =~ "^Occurred.*");
    # Occurred,Reported,Location,Latitude,Longitude,Shape,Duration,Narrative
    $line =~ /(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\t(.*)\s+/;
    my $occurred = $1;
    my $reported = $2;
    my $location = $3;
    my $latitude = $4;
    my $longitude = $5;
    my $shape = $6;
    my $duration = $7;
    my $narrative = $8;
    if (!defined $shape || ($shape eq '')) {
        $shape = "Other";
    }
    if ($shape =~ /[Uu]nknown/) {
        $shape = "Other";
    }
    if (defined $duration && $duration ne '') {
        $duration = cleanDuration($duration);
    }
    print $outputHandle "$occurred\t$reported\t$location\t$latitude\t$longitude\t$shape\t$duration\t$narrative\n";
}

close($inputHandle);
close($outputHandle);
