use strict;
use warnings;

use Text::CSV;
use Lingua::EN::Words2Nums;

sub max {
    my $one = shift;
    my $two = shift;

    if ($one > $two) {
        return $one;
    } else {
        return $two;
    }
}

sub normalizeDuration {
    my ($hour, $minute, $second) = @_;
    #print("normalizeDuration args: $hour, $minute, $second\n");
    if ($second >= 60) {
        my $minutesFromSeconds = int($second / 60);
        $second -= ($minutesFromSeconds * 60);
        $minute += $minutesFromSeconds;
        #print("seconds result: $minute, $second\n");
    }
    if ($minute >= 60) {
        my $hoursFromMinutes = int($minute / 60);
        $minute -= ($hoursFromMinutes * 60);
        $hour += $hoursFromMinutes;
        #print("minutes result: $hour, $minute\n");
    }
    my $retVal = sprintf("%02d:%02d:%02d", $hour, $minute, $second);
    #print("retVal is: $retVal\n");
    return $retVal;
}

sub cleanDuration {
    my $dur = shift;
    #print "cleanDuration args:  $dur\n";
    my $seconds = 0;
    my $minutes = 0;
    my $hours = 0;

    if ($dur =~ /\s*(\d+)\s*\:\s*(\d+)\s*/) {
        #print ("G\n");
        $minutes += int($1);
        $seconds += int($2);
    } elsif ($dur =~ /\s*(\d+)\s*\:\s*(\d+)\s*\:\s*(\d+)\s*/) {
        #print ("H\n");
        $hours += int($1);
        $minutes += int($2);
        $seconds += int($3);
    } elsif ($dur =~ /\s*(\d+)\s*(?:\-|(?:to)|(?:or))\s*(\d+)\s*([A-Za-z]+)/i) {
        #print ("A\n");
        my $startValue = int($1);
        my $endValue = int($2);
        my $unit = $3;
        #print("start value: $startValue, end value: $endValue, unit: $unit\n");
        my $value;
        if (($startValue > 0) && ($endValue > 0)) {
            $value = ($startValue + $endValue) / 2.0;
        } else {
            $value = max($startValue, $endValue);
        }
        if ($unit =~ /sec?(?:ond)?s?\.?/i ) {
            $seconds += $value;
        } elsif ($unit =~ /mi?n?(?:ute)?s?\.?/i) {
            $minutes += $value; 
        } elsif ($unit =~ /h(?:ou)?r?s?\.?/i) {
            $hours += $value;
        }
    } elsif ($dur =~ /(\d+)\s*([A-Za-z]+)\s*(\d+)\s*([A-Za-z]+)/) {
        #print ("K\n");
        my $value = int($1);
        my $unit = $2;
        my $value2 = int($3);
        my $unit2 = $4;
        #print("value: $value, unit: $unit, unit2: $unit2, value2: $value2\n");
        if ($unit =~ /sec(?:ond)?s?\.?/i ) {
            $seconds += $value;
        } elsif ($unit =~ /mi?n?(?:ute)?s?\.?/i) {
            $minutes += $value; 
        } elsif ($unit =~ /h(?:ou)?r?s?\.?/i) {
            $hours += $value;
        }
        if ($unit2 =~ /sec(?:ond)?s?\.?/i ) {
            $seconds += $value2;
        } elsif ($unit2 =~ /mi?n?(?:ute)?s?\.?/i) {
            $minutes += $value2; 
        } elsif ($unit2 =~ /h(?:ou)?r?s?\.?/i) {
            $hours += $value2;
        }
        #print("K out: $hours, $minutes, $seconds\n");
    } elsif ($dur =~ /(\d+)\s*([A-Za-z]+)/) {
        #print ("B\n");
        my $value = int($1);
        my $unit = $2;
        #print("value: $value, unit: $unit\n");
        if ($unit =~ /sec(?:ond)?s?\.?/i ) {
            $seconds += $value;
        } elsif ($unit =~ /mi?n?(?:ute)?s?\.?/i) {
            $minutes += $value; 
        } elsif ($unit =~ /h(?:ou)?r?s?\.?/i) {
            $hours += $value;
        }
    } elsif ($dur =~ /(.*)sec(?:ond)?s?\.?/i) {
        #print ("C\n");
        my $parsed = words2nums($1);
        if (defined $parsed) {
            $seconds += $parsed;
        } else {
            $seconds += 5;
        }
    } elsif ($dur =~ /(.*)min(?:ute)?s?\.?/i) {
        #print ("D\n");
        my $parsed = words2nums($1);
        if (defined $parsed) {
            $minutes += $parsed;
        } else {
            $minutes += 5;
        }
    } elsif ($dur =~ /(.*)h(?:ou)?rs?\.?/i) {
        #print ("E\n");
        my $parsed = words2nums($1);
        if (defined $parsed) {
            $hours += $parsed;
        } else {
            $hours += 2;
        }
    } elsif ($dur =~ /\s*(\d+)\s*/) {
        #print ("F\n");
        $minutes += int($1);
    }
    return normalizeDuration($hours, $minutes, $seconds);
}

# open the input file
my $inputHandle;
open($inputHandle, "<", "data.tsv") or die("Cannot open input file!");
my $tsv = Text::CSV->new({binary => 1, sep_char => "\t", eol => "\r\n"}) or die("Error creating TSV reader!");
my @rows;
$tsv->column_names($tsv->getline($inputHandle));
while(my $row = $tsv->getline($inputHandle)) {
    # Occurred,Reported,Location,Latitude,Longitude,Shape,Duration,Narrative
    my $shape = $row->[5];
    my $duration = $row->[6];

    if (!defined $shape || ($shape eq '') || $shape =~ /unknown/i) {
        $row->[5] = "Other";
    }

    #print("duration: $duration\n");
    if (defined $duration && $duration ne '') {
        $duration = cleanDuration($duration);
        next if ($duration eq "00:00:00");
        $row->[6] = $duration;
    }

    push @rows, $row;
}
close($inputHandle);

# open the output file
my $outputHandle;
open($outputHandle, ">", "dataNorm.tsv") or die("Cannot open output file!");
$tsv->print($outputHandle, $_) for @rows;
close($outputHandle);
