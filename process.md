<span class="c17">Project Proposal</span>

<span class="c24">Basic Information</span>
==========================================

<span>Project Title:  </span><span class="c25">UFO Report Explorer</span>
-------------------------------------------------------------------------

<span class="c13">Team Information:</span>
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
<td><p><span class="c22">Team Members:</span></p></td>
<td><p><span class="c11">Jonathon Pearson</span></p></td>
<td><p><span class="c11">Richard Scott McNew</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c22">Email Addresses:</span></p></td>
<td><p><span class="c2">jnewellpearson@gmail.com</span></p></td>
<td><p><span class="c2">richard.scott.mcnew@gmail.com</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c22">A Numbers:</span></p></td>
<td><p><span class="c2">A01108018</span></p></td>
<td><p><span class="c2">A02077329</span></p></td>
</tr>
</tbody>
</table>

<span class="c13">Project Git Repository:</span>
------------------------------------------------

<span class="c11">https://github.com/rmcnew/TheBestTeamProject</span>

<span>Background and Motivation</span>
--------------------------------------

<span class="c2">Q:  Discuss your motivations and reasons for choosing this project, especially any background or research interests that may have influenced your decision.
</span>

<span class="c2">A:  Have you ever wondered if we are not alone in the universe?  Could there be visitors from other worlds who are watching?  We know that the truth is out there.  By analyzing UFO sighting data from the National UFO Reporting Center and creating visualizations from the data we hope to show trends and find answers to help discover the truth.  The UFO sighting data is interesting, mysterious, and fun to examine, scrutinize, and explore.</span>

<span class="c13">Project Objectives</span>
-------------------------------------------

<span class="c2">Q:  Provide the primary questions you are trying to answer with your visualization. What would you like to learn and accomplish? List the benefits.
</span>

<span class="c2">A:  Are there patterns in UFO sightings by time, location, duration, or UFO shape?  If so, what are the patterns and what might they indicate?  For example, do multiple sightings in a short time period in a small geographic area indicate a single event with multiple observers?  Do sightings with the same characteristics reoccur in different places or in the same place periodically?  What, if any, characteristics are common to the UFO sightings?  Do any UFO sightings happen during daylight hours?</span>

<span class="c13">Data</span>
-----------------------------

<span>Q:  </span><span class="c2">From where and how are you collecting your data? If appropriate, provide a link to your data sources.
</span>

<span class="c2">A:  Our data comes from the National UFO Reporting Center (NUFORC) http://www.nuforc.org/webreports.html</span>

<span class="c13">Data Processing</span>
----------------------------------------

<span>Q:  </span><span class="c2">Do you expect to do substantial data cleanup? What quantities do you plan to derive from your data? How will data processing be implemented?
</span>

<span class="c2">A:  Yes, we will need to clean up the data.  The NUFORC data will need to be cleaned up to remove test data and format it in CSV or JSON format for use in D3.js visualizations.  The data retrieval will be performed by the wget command line tool.  Data clean up and formatting will be handled with custom Perl scripts.  (The Perl scripts will be placed in our GitHub repository.)  There is basic location data for most of the UFO sightings, but it is given as "city, state" or "city, country".  The basic location data will be cross referenced with GIS data to get approximate latitude, longitude data for use in map plots.  Data visualizations will then be built from the clean, formatted, cross-referenced data.</span>

<span class="c13">Visualization Design</span>
---------------------------------------------

<span>Q:  </span><span class="c2">How will you display your data? Provide some general ideas that you have for the visualization design. Develop three alternative prototype designs for your visualization. Create one final design that incorporates the best of your three designs. Describe your designs and justify your choices of visual encodings. We recommend you use the Five Design Sheet Methodology.
</span>

<span class="c2">A:  We will display the data on a website, perhaps with a Google Maps component.</span>

### <span class="c7">General Ideas</span>

<span class="c2">We would like to ensure that our location data is displayed using a map.  The map may be a D3.js drawn map or a Google Maps overlay.  We also want to have one or more line / bar charts that show summary information across different dimensions of the represented data.  For example, there could be a line chart that shows the number of UFO sightings over a given time period and a bar chart that shows the shapes of the UFOs sighted.  </span>

<span class="c2"></span>

<span class="c2">The controls should be simple and fairly intuitive to use.  They should facilitate exploration of the data and make it easy to find trends and to "drill-down" to get all of the details of a particular UFO sighting.  We could use mouse-based drag-to-select or brushing to allow the user to focus on an area of interest.  Checkboxes or radio buttons on a side control panel might also be an easy way for users to filter the data.</span>

### <span>Prototype Concept One</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 424.00px;">![](images/image1.png)</span>

<span class="c2"></span>

<span>Prototype Concept One places the control panels on the left and the narrative / detail box in the middle between the map and line graphs.  The map and line graph are about equal in size so that both can be studied and used to select and explore the data.</span>

------------------------------------------------------------------------

### <span class="c7">Prototype Concept Two</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 397.33px;">![](images/image3.png)</span>

<span class="c2">Prototype Concept Two puts a timeline selector on the top and uses a larger map compared to smaller line and bar graphs.  The narrative / detail pane is on the right side, giving the map the center of attention and focus.  </span>

------------------------------------------------------------------------

### <span class="c7"></span>

### <span class="c7">Prototype Concept Three</span>

<span class="c2"></span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 360.00px;">![](images/image5.png)</span>

<span class="c2"></span>

<span class="c2">Prototype Concept Three takes the map focus to an extreme.  The date / timeline control is below the map along with miniature line and bar charts and other controls.  The detail / narrative panel takes up the entire right panel, allowing for multiple event details to be displayed at once and still remain out of the way.</span>

### <span class="c7">Prototype Concept Four</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 301.33px;">![](images/image2.png)</span>

<span class="c2"></span>

<span class="c2">Prototype Four allows four filtering results based on geographical regions and and time.  As you Zoom in on the map it will filter the results for the line graph.  Also you have the ability to hover over a point to get more details including the description of the sighting.</span>

<span class="c2"></span>

### <span class="c7">Prototype Concept Five</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 536.00px;">![](images/image7.png)</span>

<span class="c2"></span>

<span class="c2">Prototype Five for different ways to view the data.  There is a timeline at the top showing sightings over time as a line graph.  The map shows where the sightings were reported, if one region has many events, the radius is made large.  The section to the left shows different attributes shown in a chart that makes sense for the attribute. You can also select a sighting in the map and get more details listed below.</span>

------------------------------------------------------------------------

### <span class="c7"></span>

### <span class="c7">Prototype Concept Six</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 621.50px; height: 575.00px;">![](images/image4.png)</span>

<span class="c2">Prototype Six combines ideas from Prototypes Two, Four, and Five.  All controls are linked so that the same data is displayed on multiple visualization elements at once.  Dragging / brushing and holding down Control and clicking on UFO sighting events allows the user to select multiple events.  </span>

<span class="c2"></span>

<span class="c2">Selected events are highlighted on the map and in the Detail Panel.  Clicking on one or more events in the detail panel highlights the respective points on the map and line graphs.  The Shape Checkbox controls on the top right allow the user to filter events by UFO shape.  It might also make sense to add a control / filter for the duration of the UFO sighting.  Perhaps we could add a keyword search to the Detail Panel if it is not too difficult (an optional feature).</span>

### <span class="c7">Detailed Design / Description of Components</span>

<span class="c2"></span>

<span class="c2">Date Slider Concept</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 624.00px; height: 58.67px;">![](images/image6.png)</span>

<span class="c27">1950              1975                      1990           2000          2004                             2014                  2016                 2018</span>

### <span class="c7">Final Design Concept</span>

<span class="c2"></span>

<span class="c2">The Final Design will be based on Prototype Six.  We will make adjustments as needed based on the size and quality of the dataset.</span>

<span class="c13">Must-Have Features</span>
-------------------------------------------

<span>Q:  </span><span class="c2">List the features without which you would consider your project to be a failure.
</span>

<span class="c2">A:  UFO Sightings plotted on maps with filters to show by time ranges and UFO type.  Line / bar graphs that number of UFO sightings over time and UFO type.  The map and charts should be linked with common controls so that the same data is displayed on all visualization elements.  </span>

<span class="c13">Optional Features</span>
------------------------------------------

<span>Q:  </span><span class="c2">List the features which you consider to be nice to have, but not critical.
</span>

<span class="c2">A:  It would be nice to also show any time delays between when a UFO sighting occurred and when the UFO sighting was reported.  A long time delay between the occurrence and report might raise questions about the validity of the details and why the report was not made earlier.</span>

<span class="c2"></span>

<span class="c2">We might also want to add narrative search capabilities for the UFO sighting events if there is time and it is not too difficult.</span>

<span class="c13">Project Schedule</span>
-----------------------------------------

<span>Q:  </span><span>Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and responsibilities among your team members.  Write this in terms of weekly deadlines.</span>

<span class="c2"></span>

<span class="c2">A:  Tentative Project Schedule</span>

<span class="c2"></span>

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
<td><p><span class="c11">Due Out Item</span></p></td>
<td><p><span class="c11">Due Date</span></p></td>
<td><p><span class="c11">Description / Notes</span></p></td>
<td><p><span class="c11">Assigned To:</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c2">Project Proposal</span></p></td>
<td><p><span class="c2">November 5</span></p></td>
<td><p><span class="c2">This document</span></p></td>
<td><p><span class="c2">Both</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c2">Data Extraction</span></p></td>
<td><p><span class="c2">November 6</span></p></td>
<td><p><span class="c2">Download all data from NUFORC website and extract to CSV or JSON</span></p></td>
<td><p><span class="c2">Scott</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c2">Cross reference geographic locations to latitude, longitude pairs</span></p></td>
<td><p><span class="c2">November 7</span></p></td>
<td><p><span class="c2"></span></p></td>
<td><p><span class="c2">Scott</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c2">Build map panel</span></p></td>
<td><p><span class="c2">November 12</span></p></td>
<td><p><span class="c2"></span></p></td>
<td><p><span class="c2">Jonathon</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c2">Plot sighting locations on map</span></p></td>
<td><p><span class="c2">November 15</span></p></td>
<td><p><span class="c2"></span></p></td>
<td><p><span class="c2">Jonathon</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c2">Build line chart panel</span></p></td>
<td><p><span class="c2">November 18</span></p></td>
<td><p><span class="c2"></span></p></td>
<td><p><span class="c2">Scott</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c2">Project Prototype</span></p></td>
<td><p><span class="c2">November 19</span></p></td>
<td><p><span class="c2">https://usu.instructure.com/courses/516435/assignments/2536774</span></p></td>
<td><p><span class="c2">Both</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c2">Link all visualization elements</span></p></td>
<td><p><span class="c2">November 22</span></p></td>
<td><p><span class="c2"></span></p></td>
<td><p><span class="c2">Both</span></p></td>
</tr>
<tr class="even">
<td><p><span class="c2">Polish User Interface</span></p></td>
<td><p><span class="c2">November 26</span></p></td>
<td><p><span class="c2"></span></p></td>
<td><p><span class="c2">Both</span></p></td>
</tr>
<tr class="odd">
<td><p><span class="c2">Project Final Submission</span></p></td>
<td><p><span class="c2">November 30</span></p></td>
<td><p><span class="c2">https://usu.instructure.com/courses/516435/assignments/2536776</span></p></td>
<td><p><span class="c2">Both</span></p></td>
</tr>
</tbody>
</table>

<span class="c2"></span>
