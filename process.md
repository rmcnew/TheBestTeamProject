<span class="c17 c9">The Best Team</span>

<span class="c4"></span>

<span class="c17 c9"></span>

<span class="c17 c9">UFO Report Explorer</span>

<span class="c17 c9"></span>

<span class="c9">Project Process Document</span>

------------------------------------------------------------------------

<span class="c9 c17">Project Proposal</span>

<span class="c32">Basic Information</span>
==========================================

<span>Project Title:  </span><span class="c26 c9">UFO Report Explorer</span>
----------------------------------------------------------------------------

<span class="c12">Team Information:</span>
------------------------------------------

<span id="t.f456d6fcfc2399c718e36dc8e3f4d373bdcc6fea"></span><span id="t.0"></span>

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><span class="c19 c9">Team Members:</span></p></td>
<td><p><span class="c20 c9">Jonathon Pearson</span></p></td>
<td><p><span class="c20 c9">Richard Scott McNew</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c19 c9">Email Addresses:</span></p></td>
<td><p><span class="c4">jnewellpearson@gmail.com</span></p></td>
<td><p><span class="c4">richard.scott.mcnew@gmail.com</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c9 c19">A Numbers:</span></p></td>
<td><p><span class="c4">A01108018</span></p></td>
<td><p><span class="c4">A02077329</span></p></td>
</tr>
</tbody>
</table>

<span class="c12">Project Git Repository:</span>
------------------------------------------------

<span class="c20 c9">https://github.com/rmcnew/TheBestTeamProject</span>

<span>Background and Motivation</span>
--------------------------------------

<span class="c4">Q:  Discuss your motivations and reasons for choosing this project, especially any background or research interests that may have influenced your decision.
</span>

<span class="c4">A:  Have you ever wondered if we are not alone in the universe?  Could there be visitors from other worlds who are watching?  We know that the truth is out there.  By analyzing UFO sighting data from the National UFO Reporting Center and creating visualizations from the data we hope to show trends and find answers to help discover the truth.  The UFO sighting data is interesting, mysterious, and fun to examine, scrutinize, and explore.</span>

<span class="c12">Project Objectives</span>
-------------------------------------------

<span class="c4">Q:  Provide the primary questions you are trying to answer with your visualization. What would you like to learn and accomplish? List the benefits.
</span>

<span class="c4">A:  Are there patterns in UFO sightings by time, location, duration, or UFO shape?  If so, what are the patterns and what might they indicate?  For example, do multiple sightings in a short time period in a small geographic area indicate a single event with multiple observers?  Do sightings with the same characteristics reoccur in different places or in the same place periodically?  What, if any, characteristics are common to the UFO sightings?  Do any UFO sightings happen during daylight hours?</span>

<span class="c12">Data</span>
-----------------------------

<span>Q:  </span><span class="c4">From where and how are you collecting your data? If appropriate, provide a link to your data sources.
</span>

<span class="c4">A:  Our data comes from the National UFO Reporting Center (NUFORC) http://www.nuforc.org/webreports.html</span>

<span class="c12">Data Processing</span>
----------------------------------------

<span>Q:  </span><span class="c4">Do you expect to do substantial data cleanup? What quantities do you plan to derive from your data? How will data processing be implemented?
</span>

<span class="c4">A:  Yes, we will need to clean up the data.  The NUFORC data will need to be cleaned up to remove test data and format it in CSV or JSON format for use in D3.js visualizations.  The data retrieval will be performed by the wget command line tool.  Data clean up and formatting will be handled with custom Perl scripts.  (The Perl scripts will be placed in our GitHub repository.)  There is basic location data for most of the UFO sightings, but it is given as "city, state" or "city, country".  The basic location data will be cross referenced with GIS data to get approximate latitude, longitude data for use in map plots.  Data visualizations will then be built from the clean, formatted, cross-referenced data.</span>

<span class="c12">Visualization Design</span>
---------------------------------------------

<span>Q:  </span><span class="c4">How will you display your data? Provide some general ideas that you have for the visualization design. Develop three alternative prototype designs for your visualization. Create one final design that incorporates the best of your three designs. Describe your designs and justify your choices of visual encodings. We recommend you use the Five Design Sheet Methodology.
</span>

<span class="c4">A:  We will display the data on a website, perhaps with a Google Maps component.</span>

### <span class="c24">General Ideas</span>

<span class="c4">We would like to ensure that our location data is displayed using a map.  The map may be a D3.js drawn map or a Google Maps overlay.  We also want to have one or more line / bar charts that show summary information across different dimensions of the represented data.  For example, there could be a line chart that shows the number of UFO sightings over a given time period and a bar chart that shows the shapes of the UFOs sighted.  </span>

<span class="c4"></span>

<span class="c4">The controls should be simple and fairly intuitive to use.  They should facilitate exploration of the data and make it easy to find trends and to "drill-down" to get all of the details of a particular UFO sighting.  We could use mouse-based drag-to-select or brushing to allow the user to focus on an area of interest.  Checkboxes or radio buttons on a side control panel might also be an easy way for users to filter the data.</span>

### <span class="c41">Prototype Concept One</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 424.00px;">![](images/image12.png)</span>

<span class="c4"></span>

<span>Prototype Concept One places the control panels on the left and the narrative / detail box in the middle between the map and line graphs.  The map and line graph are about equal in size so that both can be studied and used to select and explore the data.</span>

------------------------------------------------------------------------

### <span class="c24">Prototype Concept Two</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 397.33px;">![](images/image9.png)</span>

<span class="c4">Prototype Concept Two puts a timeline selector on the top and uses a larger map compared to smaller line and bar graphs.  The narrative / detail pane is on the right side, giving the map the center of attention and focus.  </span>

------------------------------------------------------------------------

### <span class="c24"></span>

### <span class="c24">Prototype Concept Three</span>

<span class="c4"></span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 360.00px;">![](images/image5.png)</span>

<span class="c4"></span>

<span class="c4">Prototype Concept Three takes the map focus to an extreme.  The date / timeline control is below the map along with miniature line and bar charts and other controls.  The detail / narrative panel takes up the entire right panel, allowing for multiple event details to be displayed at once and still remain out of the way.</span>

### <span class="c24">Prototype Concept Four</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 301.33px;">![](images/image1.png)</span>

<span class="c4"></span>

<span class="c4">Prototype Four allows four filtering results based on geographical regions and and time.  As you Zoom in on the map it will filter the results for the line graph.  Also you have the ability to hover over a point to get more details including the description of the sighting.</span>

<span class="c4"></span>

### <span class="c24">Prototype Concept Five</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 536.00px;">![](images/image3.png)</span>

<span class="c4"></span>

<span class="c4">Prototype Five for different ways to view the data.  There is a timeline at the top showing sightings over time as a line graph.  The map shows where the sightings were reported, if one region has many events, the radius is made large.  The section to the left shows different attributes shown in a chart that makes sense for the attribute. You can also select a sighting in the map and get more details listed below.</span>

------------------------------------------------------------------------

### <span class="c24"></span>

### <span class="c24">Prototype Concept Six</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 621.50px; height: 575.00px;">![](images/image19.png)</span>

<span class="c4">Prototype Six combines ideas from Prototypes Two, Four, and Five.  All controls are linked so that the same data is displayed on multiple visualization elements at once.  Dragging / brushing and holding down Control and clicking on UFO sighting events allows the user to select multiple events.  </span>

<span class="c4"></span>

<span class="c4">Selected events are highlighted on the map and in the Detail Panel.  Clicking on one or more events in the detail panel highlights the respective points on the map and line graphs.  The Shape Checkbox controls on the top right allow the user to filter events by UFO shape.  It might also make sense to add a control / filter for the duration of the UFO sighting.  Perhaps we could add a keyword search to the Detail Panel if it is not too difficult (an optional feature).</span>

### <span class="c24">Detailed Design / Description of Components</span>

<span class="c4"></span>

<span class="c4">Date Slider Concept</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 58.67px;">![](images/image15.png)</span>

<span class="c34 c30">1950              1975                      1990           2000          2004                             2014                  2016                 2018</span>

<span class="c34 c30"></span>

<span class="c30">        </span><span class="c4">The date slider will allow for selecting and filtering a given date range.  When selected, the other charts will filter their results based on the selection.</span>

<span class="c4"></span>

<span class="c4">Map</span>

### <span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 333.33px;">![](images/image18.png)</span>

<span class="c4"></span>

<span>        The map will show points for each of the reported sightings.  If one particular area has more sighting than another, they will be shown with a larger radius.  As you hover over a data point, a brief description of the event will pop up. If there is more than one dataitem associated with a point, the description will show the count of how many events are associated with it.  Also, you can use the selection tool to filter the data shown in the other charts.</span>

<span class="c4"></span>

<span class="c4">Line Chart</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 233.50px; height: 168.69px;">![](images/image13.png)</span>

<span class="c25">        </span><span class="c34 c30">1990        2000        2010        2018        </span>

<span class="c30">        </span>

<span class="c4">        The line chart will show how many sightings were reported at a given time.  This chart will be affected by the selection of the area on the map and the date range from the date selector.</span>

<span class="c34 c30"></span>

<span class="c4">Bar Chart</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 308.00px; height: 223.00px;">![](images/image17.png)</span>

<span class="c4"></span>

<span class="c4">        This barchart will show the count of the different shape types that were reported in the dataset.  This chart will be affected by the date selector and the points selected on the map.</span>

<span class="c4"></span>

<span class="c4"></span>

<span class="c4">Detail Panel                </span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 352.23px; height: 335.50px;">![](images/image8.png)</span><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 153.77px; height: 190.50px;">![](images/image7.png)</span>

### <span class="c24"></span>

### <span class="c24">Final Design Concept</span>

<span class="c4"></span>

<span class="c4">The Final Design will be based on Prototype Six.  We will make adjustments as needed based on the size and quality of the dataset.</span>

<span class="c12">Must-Have Features</span>
-------------------------------------------

<span>Q:  </span><span class="c4">List the features without which you would consider your project to be a failure.
</span>

<span class="c4">A:  UFO Sightings plotted on maps with filters to show by time ranges and UFO type.  Line / bar graphs that number of UFO sightings over time and UFO type.  The map and charts should be linked with common controls so that the same data is displayed on all visualization elements.  </span>

<span class="c12">Optional Features</span>
------------------------------------------

<span>Q:  </span><span class="c4">List the features which you consider to be nice to have, but not critical.
</span>

<span class="c4">A:  It would be nice to also show any time delays between when a UFO sighting occurred and when the UFO sighting was reported.  A long time delay between the occurrence and report might raise questions about the validity of the details and why the report was not made earlier.</span>

<span class="c4"></span>

<span class="c4">We might also want to add narrative search capabilities for the UFO sighting events if there is time and it is not too difficult.</span>

<span class="c12">Project Schedule</span>
-----------------------------------------

<span>Q:  </span><span>Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and responsibilities among your team members.  Write this in terms of weekly deadlines.</span>

<span class="c4"></span>

<span class="c4">A:  Tentative Project Schedule</span>

<span class="c4"></span>

<span id="t.09d83c95cd08da7f72d7356dec034c6950f155e0"></span><span id="t.1"></span>

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><span class="c20 c9">Due Out Item</span></p></td>
<td><p><span class="c20 c9">Due Date</span></p></td>
<td><p><span class="c20 c9">Description / Notes</span></p></td>
<td><p><span class="c20 c9">Assigned To:</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c4">Project Proposal</span></p></td>
<td><p><span class="c4">November 5</span></p></td>
<td><p><span class="c4">This document</span></p></td>
<td><p><span class="c4">Both</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c4">Data Extraction</span></p></td>
<td><p><span class="c4">November 6</span></p></td>
<td><p><span class="c4">Download all data from NUFORC website and extract to CSV or JSON</span></p></td>
<td><p><span class="c4">Scott</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c4">Cross reference geographic locations to latitude, longitude pairs</span></p></td>
<td><p><span class="c4">November 7</span></p></td>
<td><p><span class="c4"></span></p></td>
<td><p><span class="c4">Scott</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c4">Build map panel</span></p></td>
<td><p><span class="c4">November 12</span></p></td>
<td><p><span class="c4"></span></p></td>
<td><p><span class="c4">Jonathon</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c4">Plot sighting locations on map</span></p></td>
<td><p><span class="c4">November 15</span></p></td>
<td><p><span class="c4"></span></p></td>
<td><p><span class="c4">Jonathon</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c4">Build line chart panel</span></p></td>
<td><p><span class="c4">November 18</span></p></td>
<td><p><span class="c4"></span></p></td>
<td><p><span class="c4">Scott</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c4">Project Prototype</span></p></td>
<td><p><span class="c4">November 19</span></p></td>
<td><p><span class="c4">https://usu.instructure.com/courses/516435/assignments/2536774</span></p></td>
<td><p><span class="c4">Both</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c4">Link all visualization elements</span></p></td>
<td><p><span class="c4">November 22</span></p></td>
<td><p><span class="c4"></span></p></td>
<td><p><span class="c4">Both</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c4">Polish User Interface</span></p></td>
<td><p><span class="c4">November 26</span></p></td>
<td><p><span class="c4"></span></p></td>
<td><p><span class="c4">Both</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c4">Project Final Submission</span></p></td>
<td><p><span class="c4">November 30</span></p></td>
<td><p><span class="c4">https://usu.instructure.com/courses/516435/assignments/2536776</span></p></td>
<td><p><span class="c4">Both</span></p></td>
</tr>
</tbody>
</table>

------------------------------------------------------------------------

<span class="c4"></span>

<span class="c17 c9">Project Prototype</span>

<span class="c32">Basic Information</span>
==========================================

<span>Project Title:  </span><span class="c26 c9">UFO Report Explorer</span>
----------------------------------------------------------------------------

<span class="c12">Team Information:</span>
------------------------------------------

<span id="t.f456d6fcfc2399c718e36dc8e3f4d373bdcc6fea"></span><span id="t.2"></span>

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><span class="c19 c9">Team Members:</span></p></td>
<td><p><span class="c20 c9">Jonathon Pearson</span></p></td>
<td><p><span class="c9 c20">Richard Scott McNew</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c19 c9">Email Addresses:</span></p></td>
<td><p><span class="c4">jnewellpearson@gmail.com</span></p></td>
<td><p><span class="c4">richard.scott.mcnew@gmail.com</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c19 c9">A Numbers:</span></p></td>
<td><p><span class="c4">A01108018</span></p></td>
<td><p><span class="c4">A02077329</span></p></td>
</tr>
</tbody>
</table>

<span class="c26 c9">Project Git Repository:</span>
---------------------------------------------------

<span class="c9">https://github.com/rmcnew/TheBestTeamProject</span>

<span class="c26 c9">Background and Motivation:</span>
------------------------------------------------------

<span class="c4">Q:  Provide an overview of the project goals and the motivation for it. Consider that this will be read by people who did not see your project proposal.</span>

<span class="c4"></span>

<span>A:  Have you ever wondered if we are not alone in the universe?  Could there be visitors from other worlds who are watching?  We know that the truth is out there.  In fact there are many who have reported seeing unexplainable phenomena.   By analyzing UFO sighting data from the National UFO Reporting Center and creating visualizations from the data we hope to show trends and find answers to help discover the truth.  The UFO sighting data is interesting, mysterious, and fun to examine, scrutinize, and explore.  </span>

<span class="c9">Related Work:</span><span class="c12"> </span>
---------------------------------------------------------------

<span>Q:  </span><span class="c14">Anything</span><span class="c4"> that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.
</span>

<span>A:  UFOs are imagination fuel.  They inspired popular books, movies, and TV shows such as </span><span class="c29">Close Encounters of the Third Kind</span><span>, </span><span class="c29">Independence Day</span><span>, </span><span class="c29">Men In Black</span><span>, </span><span class="c29">The X-Files</span><span class="c4">, and many more.  Our UFO Report Explorer seeks to capture the imagination of UFO enthusiasts and the curious who want to know the truth.  </span>

<span class="c4"></span>

<span class="c9">Questions:</span><span class="c12"> </span>
------------------------------------------------------------

<span class="c4">Q:  What questions are you trying to answer? How did these questions evolve over the course of the project? What new questions did you consider in the course of your analysis?
</span>

<span class="c4">A:  Our UFO Report Explorer should allow interested users to delve into UFO sighting data and easily see trends and corroborate multiple UFO sighting reports to a single UFO event.  That is, we want to make it easy to find and highlight sightings that occurred within a certain location (X mile radius of a given UFO sighting) at a certain time (e.g. within one hour of a given UFO sighting).  We might also want to have ways for the user to filter and group by UFO shape too.  We could do this with a bottom-up clustering of some kind (e.g. Union Find algorithm) or perhaps with SQL queries on a Web SQL database that will hold the loaded UFO sighting report data.
</span>

<span class="c4">We developed the initial set of questions by examining the UFO report data.  Each UFO report has fields that describe when the sighting occurred, where it occurred, what the UFO looked like, how long the UFO was seen, and a narrative of the event.  These data fields allowed us to find ways to filter, group, and aggregate the data to seek trends.
Upon further consideration and consultation with Dr. Edwards, we decided that it would be good to  create a word cloud or some kind of histogram for the narrative parts of the UFO sightings.  This might call out of of the interesting parts of the narratives for the user to explore.  We should definitely try to put in the narrative keyword search part of the UI.</span>

<span class="c26 c9">Data: </span>
----------------------------------

<span class="c4">Q:  Source, scraping method, cleanup, etc.
</span>

<span class="c4">A:  The raw data was scraped from the NUFORC web site using wget (https://www.gnu.org/software/wget/) with the following command:</span>

<span class="c4"></span>

<span class="c19 c38">wget -w 2 --random-wait -r -k -p http://www.nuforc.org/webreports/ndxevent.html</span>

<span class="c4"></span>

<span class="c4">The raw data was approximately 2.1 gigabytes of Microsoft Frontpage-generated web pages.  The data took about two days to download due to the size of the data and our use of conservative web scraping parameters so as to not overtax the NUFORC web site.</span>

<span class="c4"></span>

<span>The </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/extractReport.pl&amp;sa=D&amp;ust=1543908285753000" class="c16">extractReport.pl</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/extractReport.pl&amp;sa=D&amp;ust=1543908285754000" class="c16"> Perl script</a></span><span class="c4"> was used to extract the useful fields from each report web page and write it to a pipe (|) delimited text file.</span>

<span class="c4"></span>

<span class="c4">The pipe delimited text file was opened in the vim text editor and regular expressions were used to find and delete all reports occurring outside the United States. </span>

<span class="c4"></span>

<span>A “city, state” to “latitude, longitude” lookup was performed using the </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/latLongLookup.pl&amp;sa=D&amp;ust=1543908285755000" class="c16">latLongLookup.pl</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/latLongLookup.pl&amp;sa=D&amp;ust=1543908285755000" class="c16"> Perl script</a></span><span> and the </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/lookupTable.csv&amp;sa=D&amp;ust=1543908285756000" class="c16">lookupTable.csv</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/lookupTable.csv&amp;sa=D&amp;ust=1543908285756000" class="c16"> file</a></span><span>.  (</span><span class="c29">lookupTable.csv </span><span>was derived from </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/uscitiesv1.4.csv&amp;sa=D&amp;ust=1543908285757000" class="c16">uscitiesv1.4.csv</a></span><span class="c4"> which was downloaded from https://simplemaps.com/data/us-cities.)</span>

<span class="c4"></span>

<span>The </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/dateTimeToIso.pl&amp;sa=D&amp;ust=1543908285758000" class="c16">dateTimeToIso.pl</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/dateTimeToIso.pl&amp;sa=D&amp;ust=1543908285758000" class="c16"> Perl script</a></span><span class="c4"> was used to convert the UFO sighting occurrence datetime and UFO report datetime to a standard ISO 8601 format (YYYY-mm-ddTHH:MM).</span>

<span class="c4"></span>

<span>The </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/normalizeDuration.pl&amp;sa=D&amp;ust=1543908285759000" class="c16">normalizeDuration.pl</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/normalizeDuration.pl&amp;sa=D&amp;ust=1543908285760000" class="c16">Perl script</a></span><span class="c4"> was used to convert a myriad of UFO sighting durations to a standardized hour:minute:second (HH:MM:SS) format. </span>

<span class="c9">Exploratory Data Analysis:</span><span class="c12"> </span>
----------------------------------------------------------------------------

<span class="c4">Q:  What visualizations did you use to initially look at your data? What insights did you gain? How did these insights inform your design?
</span>

<span class="c4">A:  We initially examined the data on the NUFORC website itself.  This gave us an idea of the properties of individual UFO reports and some idea of what might be possible with the data.  After the data was scraped from the NUFORC website and cleaned up, we viewed the collected data in a spreadsheet.</span>

<span class="c4"></span>

<span class="c4">Although we did not use any visualization tools to look at the data, we saw that the source data was not well organized on the NUFORC website and might contain trends and other groupings that good data visualizations could bring to light.</span>

<span class="c4"></span>

<span class="c4">The insights we gained by examining the data helped us to brainstorm the six prototype designs submitted in the project proposal.</span>

<span class="c9">Design Evolution:</span><span class="c12"> </span>
-------------------------------------------------------------------

<span class="c4">Q:  What are the different visualizations you considered? Justify the design decisions you made using the perceptual and design principles you learned in the course. Did you deviate from your proposal?
</span>

<span class="c4">A:  The different visualization designs we considered are given in the Project Proposal portion of this document above.  </span>

<span class="c4"></span>

<span>One major aspect of our visualization is the use of a map of the United States with a time selection tool to show where sightings have taken place. We have done this because o</span><span class="c4">ne of the the main questions we have is how many sightings that were experienced by many people.  Having our data viewable on a map and viewable by date will make it easier to see when and where large groups of people saw something similar.  This gives us the ability to analyze the data and see whether there is knowledge to be gained by comparing the descriptions from multiple witnesses.</span>

<span class="c4"></span>

<span class="c4">The map will also include the ability to select UFO sightings by geographic location by drag clicking a rectangle or by selecting multiple individual points by mouse click.  This allows areas of interest to be defined that can be further examined and explored.</span>

<span class="c4"></span>

<span class="c4">We also plan to use line graphs and histograms to show aggregate values for the selected and filtered data.  This will make it easy to see how many sightings occurred for a given time range and geography and focus exploration to corroborate multiple witness for a single UFO sighting event.</span>

<span class="c4"></span>

<span>We have not deviated from our proposal design so far.  We will probably add text search capabilities for the UFO sighting narratives and possibly other ways to explore the narratives if time permits.</span>

<span class="c9">Implementation:</span><span class="c12"> </span>
-----------------------------------------------------------------

<span class="c4">Q:  Describe the intent and functionality of the interactive visualizations you implemented. Provide clear and well-referenced images showing the key design and interaction elements.
</span>

<span class="c4">A:  We are using the following interactive elements:  Date Selector, UFO Shape Selector, Map Selector, and Narrative Details.  </span>

<span class="c4"></span>

<span class="c4">The Date Selector allows for filtering results by a given date range:</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 65.33px;">![](images/image16.png)</span>

<span class="c4">It uses two overlaid range slider inputs and matching date input text fields to allow the user to quickly select a date range to filter the UFO sighting report data.  Dragging either slider causes the date shown in the respective date field to update.  Typing in a date directly into the date field also works and causes the respective slider to jump to the indicated position on the timeline.</span>

<span class="c4"></span>

<span class="c4">The UFO Shape Selector is a set of checkboxes that show what kind of UFO shapes will be present in the selected data:</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 40.00px;">![](images/image21.png)</span>

<span class="c4">By checking or unchecking each UFO shape's checkbox, the user can limit the data displayed on the Map, Line and Histogram Charts, and the Narrative Details panel.</span>

<span class="c4"></span>

<span class="c4">The Map Selector plays a dual role to both display the geographic locations of UFO sightings and select one or more UFO sightings of interest:</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 386.67px;">![](images/image22.png)</span>

<span class="c4">On this prototype screenshot, each dot on the map represents an individual UFO sighting.  However, we are exploring other ways to display the map data as well such as a heat map or weighted dots that vary in size or hue for more UFO sightings at a given location.  We also would like to implement map zooming so that the user see more geographic details and select locations with greater precision.</span><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 81.53px; height: 371.50px;">![](images/image2.png)</span>

<span class="c4"></span>

<span class="c4">The Narrative Details panel gives the narrative account provided by the eyewitness who submitted the UFO sighting report.  The narratives vary considerably in length, quality, and usefulness.  Due to the sheer size of the dataset, it is not easy to manually or programmatically find and discard less useful narratives.  Nevertheless, providing the user with an easy way to search through the narratives is important and we plan to implement a basic word search functionality so that narratives of interest can be discovered and displayed on the shown on the map and charts.  </span>

<span class="c4"></span>

<span class="c4">The prototype Narrative Details shown here helped us to better understand how difficult it could be for a user to examine this data and the performance impact of loading 43,000 data entries (22 MB) into our UFO Report Explorer web page.  We will probably need to use Web Workers or some other technique to parallelize the loading of data to improve the performance of our visualizations.</span>

<span class="c4"></span>

<span class="c9">Evaluation:</span><span class="c12"> </span>
-------------------------------------------------------------

<span class="c4">Q:  What did you learn about the data by using your visualizations? How did you answer your questions? How well does your visualization work, and how could you further improve it?</span>

<span class="c4"></span>

<span class="c4">A:  We are still in the process of building our visualizations and have learned how to scrape, extract, clean, filter and normalize a fairly large dataset from 2.1 GB of raw data to 22 MB of ready-to-use data (more than 43,000 entries).  We have been learning how to efficiently organize and filter the dataset using Web SQL so that our data visualizations are performant and the user interfaces are easy for users to understand and use to explore the data.</span>

<span class="c4"></span>

<span class="c4">We are still working on building the visualizations so that our questions can be answered to easily show corroborated UFO sightings with multiple eyewitness accounts.</span>

<span class="c4"></span>

<span class="c4">Our visualization does not work very well yet, it is still a work in progress.  We are working on building out all of the features in our original design as well as the improvements recommended by Dr. Edwards.</span>

<span class="c4"></span>

------------------------------------------------------------------------

<span class="c4"></span>

<span class="c17 c9">Final Project Submission</span>

<span class="c32">Basic Information</span>
==========================================

<span>Project Title:  </span><span class="c26 c9">UFO Report Explorer</span>
----------------------------------------------------------------------------

<span class="c12">Team Information:</span>
------------------------------------------

<span id="t.f456d6fcfc2399c718e36dc8e3f4d373bdcc6fea"></span><span id="t.3"></span>

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><span class="c19 c9">Team Members:</span></p></td>
<td><p><span class="c20 c9">Jonathon Pearson</span></p></td>
<td><p><span class="c20 c9">Richard Scott McNew</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c19 c9">Email Addresses:</span></p></td>
<td><p><span class="c4">jnewellpearson@gmail.com</span></p></td>
<td><p><span class="c4">richard.scott.mcnew@gmail.com</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c19 c9">A Numbers:</span></p></td>
<td><p><span class="c4">A01108018</span></p></td>
<td><p><span class="c4">A02077329</span></p></td>
</tr>
</tbody>
</table>

<span class="c26 c9">Project Git Repository</span>
--------------------------------------------------

<span class="c9">https://github.com/rmcnew/TheBestTeamProject</span>

<span class="c26 c9">Overview and Motivation</span>
---------------------------------------------------

<span class="c4">Have you ever wondered if we are not alone in the universe?  Could there be visitors from other worlds who are watching?  We know that the truth is out there.  By analyzing UFO sighting data from the National UFO Reporting Center and creating visualizations from the data we hope to show trends and find answers to help discover the truth.  The UFO sighting data is interesting, mysterious, and fun to examine, scrutinize, and explore.</span>

<span class="c9">Related Work</span>
------------------------------------

<span>UFOs are imagination fuel.  For generations UFOs have inspired popular books, movies, and TV shows such as </span><span class="c29">Close Encounters of the Third Kind</span><span>, </span><span class="c29">Independence Day</span><span>, </span><span class="c29">Men In Black</span><span>, </span><span class="c29">The X-Files</span><span class="c4">, and many more.  Our UFO Report Explorer seeks to capture the imagination of UFO enthusiasts, engage skeptics, and open doors for the curious who want to know the truth.  </span>

<span class="c9">Questions</span>
---------------------------------

<span class="c4">The UFO Report Explorer gives interested users the ability to delve into UFO sighting data and easily see trends and corroborate multiple UFO sighting reports to a single UFO event.  The UFO Report Explorer makes it easy to find and explore UFO sightings that based on the sighting location, the sighting date, the shape of the UFO, or by sighting narrative details.  These criteria can be mixed and matched by the user to answer specific questions and see trends in the data.
</span>

<span class="c4">There is also a corroborated report filter that shows multiple UFO reports that all happened at approximately the same time and location.  This enables skeptical users to examine multiple accounts of a single sighting, possibly adding credibility and additional details.</span>

<span class="c4"></span>

<span class="c4">Common questions that the UFO Report Explorer could help to answer include:</span>

-   <span class="c4">What kind of people submit UFO sighting reports?  Are they credible?  Could they have alternative motives?</span>
-   <span class="c4">Are there any trends in the UFO reports?  If so, what might they indicate?</span>
-   <span>How has the advent of smartphones and the Internet impacted the number of UFO reports?  See </span><span class="c14"><a href="https://www.google.com/url?q=https://xkcd.com/1235/&amp;sa=D&amp;ust=1543908285782000" class="c16">https://xkcd.com/1235/</a></span><span>.</span>
-   <span class="c4">How does geography impact UFO sighting reports?  Are there any patterns of UFO sightings based on whether an area is rural, urban, near military installations, or other areas of interest?</span>

<span class="c9 c26">Data</span>
--------------------------------

### <span class="c24">Data Extraction</span>

<span class="c4">The raw data was scraped from the NUFORC web site using wget (https://www.gnu.org/software/wget/) with the following command:</span>

<span class="c4"></span>

<span class="c19 c38">wget -w 2 --random-wait -r -k -p http://www.nuforc.org/webreports/ndxevent.html</span>

<span class="c4"></span>

<span class="c4">The raw data was approximately 2.1 gigabytes of Microsoft Frontpage-generated web pages.  The data took about two days to download due to the size of the data and our use of conservative web scraping parameters so as to not overtax the NUFORC web site.</span>

<span class="c4"></span>

<span>The </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/extractReport.pl&amp;sa=D&amp;ust=1543908285786000" class="c16">extractReport.pl</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/extractReport.pl&amp;sa=D&amp;ust=1543908285786000" class="c16"> Perl script</a></span><span class="c4"> was used to extract the useful fields from each report web page and write it to a pipe (|) delimited text file.</span>

<span class="c4"></span>

### <span class="c24">Data Clean-Up and Normalization </span>

<span>The pipe delimited text file was opened in the </span><span class="c14"><a href="https://www.google.com/url?q=https://en.wikipedia.org/wiki/Vim_(text_editor)&amp;sa=D&amp;ust=1543908285788000" class="c16">vim text editor</a></span><span class="c4"> and regular expressions were used to find and delete all reports occurring outside the United States. </span>

<span class="c4"></span>

<span>A “city, state” to “latitude, longitude” lookup was performed using the </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/latLongLookup.pl&amp;sa=D&amp;ust=1543908285789000" class="c16">latLongLookup.pl</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/latLongLookup.pl&amp;sa=D&amp;ust=1543908285790000" class="c16"> Perl script</a></span><span> and the </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/lookupTable.csv&amp;sa=D&amp;ust=1543908285790000" class="c16">lookupTable.csv</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/lookupTable.csv&amp;sa=D&amp;ust=1543908285791000" class="c16"> file</a></span><span>.  (</span><span class="c29">lookupTable.csv </span><span>was derived from </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/uscitiesv1.4.csv&amp;sa=D&amp;ust=1543908285791000" class="c16">uscitiesv1.4.csv</a></span><span class="c4"> which was downloaded from https://simplemaps.com/data/us-cities.)</span>

<span class="c4"></span>

<span>The </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/dateTimeToIso.pl&amp;sa=D&amp;ust=1543908285792000" class="c16">dateTimeToIso.pl</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/dateTimeToIso.pl&amp;sa=D&amp;ust=1543908285793000" class="c16"> Perl script</a></span><span class="c4"> was used to convert the UFO sighting occurrence datetime and UFO report datetime to a standard ISO 8601 format (YYYY-mm-ddTHH:MM).</span>

<span class="c4"></span>

<span>The </span><span class="c11"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/normalizeDuration.pl&amp;sa=D&amp;ust=1543908285794000" class="c16">normalizeDuration.pl</a></span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/normalizeDuration.pl&amp;sa=D&amp;ust=1543908285795000" class="c16">Perl script</a></span><span class="c4"> was used to convert a myriad free-form text versions of UFO sighting durations to a standardized hour:minute:second (HH:MM:SS) format. </span>

<span class="c4"></span>

<span>The </span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/addEpochDatesAndIds.pl&amp;sa=D&amp;ust=1543908285796000" class="c16">addEpochDatesAndIds.pl Perl script</a></span><span> was used to convert the UFO sighting occurence datetime and UFO report datetime to </span><span class="c14"><a href="https://www.google.com/url?q=https://en.wikipedia.org/wiki/Unix_time&amp;sa=D&amp;ust=1543908285796000" class="c16">Unix Epoch</a></span><span class="c4"> seconds and add these fields to the database.  In cases where the datetimes were earlier than the epoch start (1970-01-01T00:00), a negative value was used.</span>

<span class="c4"></span>

<span>The </span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/addDurationSeconds.pl&amp;sa=D&amp;ust=1543908285797000" class="c16">addDurationSeconds.pl Perl script</a></span><span class="c4"> was used to add a DURATION\_SECONDS field to the UFO database.  This was used for the UFO Sighting Duration graph.</span>

<span class="c4"></span>

<span>The </span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data_extraction/findCorrob.pl&amp;sa=D&amp;ust=1543908285798000" class="c16">findCorrob.pl Perl script</a></span><span> was used to find corroborated UFO sightings.  The resulting data was placed in </span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/corrob.tsv&amp;sa=D&amp;ust=1543908285799000" class="c16">corrob.tsv</a></span><span class="c4"> and imported into the UFO\_CORROB table of the UFO database.</span>

<span class="c4"></span>

### <span class="c24">Data Storage and Retrieval</span>

<span>The UFO sighting reports data was originally stored in a </span><span class="c14"><a href="https://www.google.com/url?q=https://en.wikipedia.org/wiki/Web_SQL_Database&amp;sa=D&amp;ust=1543908285801000" class="c16">Web SQL database</a></span><span> that matched the structure of the tab-delimited UFO report data in </span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/rmcnew/TheBestTeamProject/blob/master/data.tsv&amp;sa=D&amp;ust=1543908285801000" class="c16">data.tsv</a></span><span class="c4">.  However, the time needed to create the in-browser database and query it was prohibitive.  Furthermore, although WebSQL is implemented in several major web browsers, it is not standardized and would not work everywhere.</span>

<span class="c4"></span>

<span>This caused us to seek a better alternative that would provide better data access performance and work everywhere.  This lead us to </span><span class="c14"><a href="https://www.google.com/url?q=https://github.com/kripken/sql.js/&amp;sa=D&amp;ust=1543908285802000" class="c16">sql.js</a></span><span>, an </span><span class="c14"><a href="https://www.google.com/url?q=https://en.wikipedia.org/wiki/Emscripten&amp;sa=D&amp;ust=1543908285803000" class="c16">Emscripten</a></span><span>-compiled version of </span><span class="c14"><a href="https://www.google.com/url?q=https://en.wikipedia.org/wiki/SQLite&amp;sa=D&amp;ust=1543908285803000" class="c16">SQLite</a></span><span>, a nearly ubiquitous embedded relational database library.  Converting from Web SQL to sql.js also allowed us to create a binary sqlite database file that was ready to use and move UFO database loading and querying into a separate thread via </span><span class="c14"><a href="https://www.google.com/url?q=https://en.wikipedia.org/wiki/Web_worker&amp;sa=D&amp;ust=1543908285804000" class="c16">Web Workers</a></span><span class="c4">.  </span>

<span class="c4"></span>

### <span class="c24">UFO Narrative Search Data</span>

<span>Later, the need for full-text searching of UFO narrative accounts arose.  The </span><span class="c14"><a href="https://www.google.com/url?q=https://lunrjs.com/&amp;sa=D&amp;ust=1543908285805000" class="c16">lunr.js</a></span><span> library was selected to create a full-text searchable index of the UFO narrative accounts.  A web worker was used to load the index file and perform full-text lookups without impacting the main UFO Report Explorer user experience.</span>

<span class="c9">Exploratory Data Analysis</span>
-------------------------------------------------

<span class="c4">We initially examined the data on the NUFORC website itself.  This gave us an idea of the properties of individual UFO reports and some idea of what might be possible with the data.  After the data was scraped from the NUFORC website and cleaned up, we viewed the collected data in a spreadsheet.</span>

<span class="c4"></span>

<span class="c4">Although we did not use any visualization tools to examine the data, we saw that the source data was not well organized on the NUFORC website and might contain trends and other groupings that good data visualizations could bring to light.</span>

<span class="c4"></span>

<span class="c4">The insights we gained by examining the data helped us to brainstorm the six prototype designs submitted in our project proposal and shown below.</span>

<span class="c9">Design Evolution</span>
----------------------------------------

### <span class="c24">General Ideas</span>

<span class="c4">We wanted to ensure that the UFO sighting location data was displayed using a map.  The map could have been a D3.js drawn map or a Google Maps overlay.  We also wanted to have one or more line / bar charts that show summary information across different dimensions of the represented data.  For example, we wanted to have a line chart to show the number of UFO sightings over a given time period and a bar chart to show the shapes of the UFOs sighted.  </span>

<span class="c4"></span>

<span class="c4">The controls should be simple and fairly intuitive to use.  They should facilitate exploration of the data and make it easy to find trends and to "drill-down" to get all of the details of a particular UFO sighting.  We could use mouse-based drag-to-select or brushing to allow the user to focus on an area of interest.  Checkboxes or radio buttons on a side control panel might also be an easy way for users to filter the data.</span>

### <span class="c24">Prototype Concept One</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 424.00px;">![](images/image12.png)</span>

<span class="c4"></span>

<span>Prototype Concept One places the control panels on the left and the narrative / detail box in the middle between the map and line graphs.  The map and line graph are about equal in size so that both can be studied and used to select and explore the data.</span>

------------------------------------------------------------------------

### <span class="c24">Prototype Concept Two</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 397.33px;">![](images/image9.png)</span>

<span class="c4">Prototype Concept Two puts a timeline selector on the top and uses a larger map compared to smaller line and bar graphs.  The narrative / detail pane is on the right side, giving the map the center of attention and focus.  </span>

------------------------------------------------------------------------

### <span class="c24"></span>

### <span class="c24">Prototype Concept Three</span>

<span class="c4"></span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 360.00px;">![](images/image5.png)</span>

<span class="c4"></span>

<span class="c4">Prototype Concept Three takes the map focus to an extreme.  The date / timeline control is below the map along with miniature line and bar charts and other controls.  The detail / narrative panel takes up the entire right panel, allowing for multiple event details to be displayed at once and still remain out of the way.</span>

### <span class="c24">Prototype Concept Four</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 301.33px;">![](images/image1.png)</span>

<span class="c4"></span>

<span class="c4">Prototype Four allows four filtering results based on geographical regions and and time.  As you Zoom in on the map it will filter the results for the line graph.  Also you have the ability to hover over a point to get more details including the description of the sighting.</span>

<span class="c4"></span>

### <span class="c24">Prototype Concept Five</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 536.00px;">![](images/image3.png)</span>

<span class="c4"></span>

<span class="c4">Prototype Five has different ways to view the data.  There is a timeline at the top showing sightings over time as a line graph.  The map shows where the sightings were reported, if one region has many events, the radius is made large.  The section to the left shows different attributes shown in a chart that makes sense for the attribute. You can also select a sighting in the map and get more details listed below.</span>

------------------------------------------------------------------------

### <span class="c24"></span>

### <span class="c24">Prototype Concept Six</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 621.50px; height: 575.00px;">![](images/image19.png)</span>

<span class="c4">Prototype Six combines ideas from Prototypes Two, Four, and Five.  All controls are linked so that the same data is displayed on multiple visualization elements at once.  Dragging / brushing and holding down Control and clicking on UFO sighting events allows the user to select multiple events.  </span>

<span class="c4"></span>

<span class="c4">Selected events are highlighted on the map and in the Detail Panel.  Clicking on one or more events in the detail panel highlights the respective points on the map and line graphs.  The Shape Checkbox controls on the top right allow the user to filter events by UFO shape.  It might also make sense to add a control / filter for the duration of the UFO sighting.  Perhaps we could add a keyword search to the Detail Panel if it is not too difficult (an optional feature).</span>

### <span class="c24">Detailed Design and Descriptions of Visualization Components</span>

<span class="c4"></span>

<span class="c4">Date Slider Concept</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 58.67px;">![](images/image15.png)</span>

<span class="c34 c30">1950              1975                      1990           2000          2004                             2014                  2016                 2018</span>

<span class="c30 c34"></span>

<span class="c30">        </span><span class="c4">The date slider will allow for selecting and filtering a given date range.  When selected, the other charts will filter their results based on the selection.</span>

<span class="c4"></span>

<span class="c4">Map</span>

### <span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 333.33px;">![](images/image18.png)</span>

<span class="c4"></span>

<span class="c4">        The map will show points for each of the reported sightings.  If one particular area has more sighting than another, they will be shown with a larger radius.  As you hover over a data point, a brief description of the event will pop up. If there is more than one dataitem associated with a point, the description will show the count of how many events are associated with it.  Also, you can use the selection tool to filter the data shown in the other charts.</span>

<span class="c4"></span>

<span class="c4">Line Chart</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 233.50px; height: 168.69px;">![](images/image13.png)</span>

<span class="c25">        </span><span class="c34 c30">1990        2000        2010        2018        </span>

<span class="c30">        </span>

<span class="c4">        The line chart will show how many sightings were reported at a given time.  This chart will be affected by the selection of the area on the map and the date range from the date selector.</span>

<span class="c34 c30"></span>

<span class="c4">Bar Chart</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 308.00px; height: 223.00px;">![](images/image17.png)</span>

<span class="c4"></span>

<span class="c4">        This barchart will show the count of the different shape types that were reported in the dataset.  This chart will be affected by the date selector and the points selected on the map.</span>

<span class="c4"></span>

<span class="c4"></span>

<span>Detail Panel                </span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 352.23px; height: 335.50px;">![](images/image8.png)</span><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 153.77px; height: 190.50px;">![](images/image7.png)</span>

### <span class="c24"></span>

### <span class="c24">Final Design Concept</span>

<span class="c4"></span>

<span class="c4">The Final Design was based on Prototype Six.</span>

<span class="c4"></span>

<span class="c4">One major aspect of our visualization is the use of a map of the United States with a time selection tool to show where sightings have taken place. We have done this because one of the the main questions we have is how many sightings that were experienced by many people.  Having our data viewable on a map and viewable by date will make it easier to see when and where large groups of people saw something similar.  This gives us the ability to analyze the data and see whether there is knowledge to be gained by comparing the descriptions from multiple witnesses.</span>

<span class="c4"></span>

<span class="c4">The map will also include the ability to select UFO sightings by geographic location by drag clicking a rectangle or by selecting multiple individual points by mouse click.  This allows areas of interest to be defined that can be further examined and explored.</span>

<span class="c4"></span>

<span class="c4">We also use line graphs and histograms to show aggregate values for the selected and filtered data.  This makes it easy to see how many sightings occurred for a given time range and geography and focus exploration to corroborate multiple witness for a single UFO sighting event.</span>

<span class="c4"></span>

<span class="c4">We have not deviated from our proposal design so far.  We will probably add text search capabilities for the UFO sighting narratives and possibly other ways to explore the narratives if time permits.</span>

<span class="c9">Implementation</span>
--------------------------------------

<span class="c4">We chose to implement the following interactive elements:  Date Selector, UFO Shape Selector, UFO Map with built-in Geography Selector, and Narrative Details.  </span>

<span class="c4"></span>

<span class="c4">The Date Selector allows for filtering results by a given date range:</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 85.33px;">![](images/image6.png)</span>

<span class="c4">It uses two overlaid range slider inputs and matching date input text fields to allow the user to quickly select a date range to filter the UFO sighting report data.  Dragging either slider causes the date shown in the respective date field to update.  Typing in a date directly into the date field also works and causes the respective slider to jump to the indicated position on the timeline.</span>

<span class="c4"></span>

<span>The UFO Shape Selector is a set of checkboxes that show what kind of UFO shapes will be present in the selected data:</span><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 509.00px; height: 105.00px;">![](images/image11.png)</span>

<span class="c4"></span>

<span class="c4">By checking or unchecking each UFO shape's checkbox, the user can limit the data displayed on the Map, Line and Histogram Charts, and the Narrative Details panel.</span>

<span class="c4"></span>

<span>The Map Selector plays a dual role to both display the geographic locations of UFO sightings and select a group of UFO sightings of interest:</span><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 370.67px;">![](images/image4.png)</span>

<span class="c4">In the final version of the map, each dot on the map represents UFO sightings of a specific location.  To show how many sightings correspond to a single location, the points vary in size and opacity for more UFO sightings at a given location.  We had originally hoped to implement map zooming so that the user see more geographic details and select locations with greater precision, but we did not have enough time to add that feature.</span>

<span class="c4"></span>

<span class="c4"></span>

<span class="c4">The Narrative Details panel gives the narrative account provided by the eyewitness who submitted the UFO sighting report.  The narratives vary considerably in length, quality, and usefulness.  Due to the sheer size of the dataset, it is not easy to manually or programmatically find and discard less useful narratives.  Nevertheless, providing the user with an easy way to search through the narratives is important and we implemented a basic word search functionality so that narratives of interest can be discovered and displayed on the map and charts. </span>

<span> </span><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 405.00px; height: 569.00px;">![](images/image10.png)</span>

<span class="c4"></span>

<span class="c4">The final version of the Narrative Details section shown here allows a user to examine all the available narratives.  The Narrative Search tool allows the use to filter details based on words or phrases they are interested in seeing.  When searching using this tool, all other data will be filtered too. As you narrow a search based on the shape of a sighting, its location, and the date, the details panel allows the user to look at the narratives given by the witness.  This allows a user to look for interesting connections in the events as well as understand what specifically is being claimed.</span>

<span class="c4"></span>

<span class="c4"></span>

<span class="c4"></span>

<span class="c4"></span>

<span class="c4"></span>

<span class="c4">The UFO Sightings Over Time chart helps to provide insights regarding when sightings have taken place.  It’s a simple line chart so we can see when the most sightings occurred with the current query settings.  This chart is based on the selection from the map, the date selector, the shape selector, and the narrative search.</span>

<span class="c4"></span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 242.67px;">![](images/image14.png)</span>

<span class="c4"></span>

<span class="c4">The UFO Sightings By Duration chart is a scatterplot that allows see how many sightings of the same duration exist.  This chart is also filtered by all the other charts and selectors.</span>

<span> </span><span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 241.33px;">![](images/image20.png)</span>

<span class="c4"></span>

<span class="c9">Evaluation</span>
----------------------------------

<span class="c4">One of the biggest challenges of this project was dealing with the large amount of data.  The first major challenge was to to scrape, extract, clean, filter and normalize the dataset from 2.1 GB of raw data to 22 MB of ready-to-use data (more than 43,000 entries).  We originally tried to use Web SQL to manage data.  In the end, we ran into to hang ups with trying to use Web SQL so we switched to sql.js based on SQLite.  We learned how to efficiently organize and filter the dataset using SQLite so that our data visualizations are performant and the user interfaces are easy for users to understand and use to explore the data.</span>

### <span class="c3">What kind of people submit UFO sighting reports?  Are they credible?  Could they have alternative motives?</span>

<span class="c4">Based on the UFO report locations and narratives, people who submit UFO sighting reports come from a vast variety of backgrounds and walks of life.  While some accounts clearly indicate a person who is likely mentally ill or a prankster, other accounts seem genuine and credible.  Many credible people have seen flying objects that they could not identify as having human origin.  Several of the accounts have multiple witnesses that reported seeing the same unexplained phenomena with regard to the locations, times, and shapes of the UFO sighting.  With such a large amount of data, there are likely to be hoaxes and pranks submitted in addition to sincere reports.  This is a normal and expected outcome when any kind of data collection portal is connected to the Internet.  However, it seems unlikely that all of the data is invalid or submitted by tricksters and trolls.  The data source, the National UFO Reporting Center (NUFORC), actively screens hoax and prank reports and thus provides a good baseline for the quality of the UFO sighting data. </span>

### <span class="c3">Are there any trends in the UFO reports?  If so, what might they indicate?</span>

<span class="c4">There are several things that have become apparent from the visualizations we have used. One of those things is that the number of sightings in our dataset are more common the further you go in time.  This is probably due to the fact that the NUFORC website was established the late 1990s with the rise of the World Wide Web.  The NUFORC website acts as an independent collector of UFO reports and makes it easy for anyone with Internet access to submit a UFO sighting report.  </span>

<span class="c4">
It is also interesting to note that there is some degree of regularity to the shapes of UFOs that are reported.  Out of more than 43,000 reports, some UFO shapes occur very often while others are extremely.  Among the corroborated reports, some shapes (Circle, Disk, Fireball, Light, Oval, and Triangle) are seen by many while others (Cone, Crescent, Cross, and Hexagon) have no corroborated reports.  This suggests some UFO shapes are more likely to be valid than others.  The Crescent and Cross shapes in particular are uncommon and are also used as religious symbols, so these could possibly be imagined or visionary on the part of a single  observer, rather than an actual event with multiple eyewitnesses.
</span>

### <span class="c3">How has the advent of smartphones and the Internet impacted the number of UFO reports?
</span>

<span>Contrary to </span><span class="c14 c35"><a href="https://www.google.com/url?q=https://xkcd.com/1235/&amp;sa=D&amp;ust=1543908285837000" class="c16">https://xkcd.com/1235/</a></span><span class="c4">, the amount of sightings during the last decade has shot up.  In fact looking at the data, you can see a steady incline in reported sightings starting in 2006 until about 2014.  So it has become clear that having cameras with us all of the time still can’t eliminate UFO sightings.  Much of the data is of a short duration, so it’s possible that witnesses with cell phones weren’t able to get any footage because of the short duration.  But we can also see that there has been a steady decline in sightings since 2014.  So it could be possible that cell phone cameras are causing a decline in phenomena that is unexplainable.  But since people were carrying cameras with them everywhere before then, it seems unlikely to be direct correlation.  It will be interesting to see how reports continue from here on out.  Did we just see a temporary spike and now all sightings will continue to decrease, or will they level out to become more like they were in the past?</span>

### <span class="c3">How does geography impact UFO sighting reports?  Are there any patterns of UFO sightings based on whether an area is rural, urban, near military installations, or other areas of interest?
</span>

<span>It is</span><span class="c4"> very apparent from the UFO reporting map that there are more sightings of UFO in the more populated areas of the United States.  Many of the UFO report narratives also indicate that there are more UFO sightings around military installations.  It’s also very interesting to note on the map that the sightings are most concentrated around areas near military bases. It’s not a perfect match, yet there seems to be a very strong correlation between the amount of sightings in an area and proximity to bases.  Places of note are California on the southern coastline,  Dallas and Houston, Texas, Northern Washington (where there are many Navy bases), and in the eastern United States from D.C to Massachusetts (where there are military bases of many kinds).  Of course these are all well populated areas as well, so it’s difficult to tell whether there is a direct connection to military bases or just to more populated areas.</span>

<span class="c4"></span>

### <span class="c3">How well does your visualization work, and how could you improve it?</span>

<span class="c4">The UFO Report Explorer works quite well given the short amount of time we had to obtain the data and design and build the visualizations.  If we had more time, we would have further improved the capabilities of the UFO map to allow for zooming and more refined selection of geographies.  We would also have improved the narrative search so that search results are ranked to show more relevant search results first.  We would add additional graphs to show a histogram of UFO shapes for the selected data and a visual comparison between the UFO sighting occurrence datetime and the datetime when the sighting report was submitted. </span>
