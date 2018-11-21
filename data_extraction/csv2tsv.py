import sys
import csv

csvin = csv.reader(sys.stdin, dialect=csv.excel)
tabout = csv.writer(sys.stdout, dialect=csv.excel_tab)
for row in csvin:
  tabout.writerow(row)

