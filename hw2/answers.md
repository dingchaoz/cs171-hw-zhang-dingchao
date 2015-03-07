**Question 0.1.** What is the meaning of the horizontal and vertical position of the nodes? Give examples of datasets particularly well suited to organize data this way.
The horizontal and vertical position of the nodes together indicate the physical position of the nodes in the space.
This type of force layout can well simulate in physics charged particles and springs place related characters in closer proximity.

**Question 0.2.** Which other channels (visual variables), beside color, size and position, could have been used? Name five.
Shape,Texture, Orientation, Value, Brightness.

**Question 0.3.** Are all the previously mentioned visual variables independent (e.g. if you change one, will it impact others?)? Give examples of graphical properties that are dependent (if any) and independent (if any) from each others.
Size is dependent each other with shape; Brightness could be dependent with texture each other;
Value could be dependent with size, shape depending on the design; The rest variables relationships are independent.

**Question 1.1.** Discuss the pros and cons of the two types of rankings (either by relative or absolute position between nodes).
Relative position
Pros: More clearly organized when being visualized, quickly to get the rankings.
Cons: It is limited to quantify the differences of value among nodes.
Absolute position
Pros: Quickly to provide information about the difference of scale among nodes, and we can tell the tiers among nodes, that is more granularity. 
Cons: Difficult to tell the rankings if multiple nodes ranks very closely on graph, due to the overlap, also it is slow to have a quick overview, as you have scroll down page.

**Question 1.2.** Which data type (quantitative, ordinal, ..) is best displayed with scatterplots? Which one is not? Give examples.
Categorical, ordinal, interval data types are best displayed with scatter plots.
For example, a group of people's salary, if we color male node blue, female node red, and the salary level as x axis,
we can easily see if the red, blue nodes are equally spanned cross or not on the x axis, which we use to evaluate if there is gender income disparity.

**Question 2.1.** What are the pros and cons of using a D3 layout? For example, why would we use the D3 pie layout when we could use a simple circle for layouting?
Using a D3 layout
Pros: Many layout types to choose from, easy to bind a large amount of data with, a lot of function
Cons: Requires d3 knowledge and time to develop, test and launch the visualization
We use D3 pie layout other than a single circle mainly because D3 pie layout does not need use to create an actual pie chart,
we can just use the arc shapre directly and makes it very easy to convert any data type into an array of objects with customized start and end angle.

**Question 3.1.** Which other strategies can you think of to reduce the visual complexity? One example is edge bundling which we introduce in the following section. Enumerate up to three
Strategy 1 Hide complexity, for example introduce a filter button that let user to choose only certain countries info instead of showing all 200 plus countries info;
Strategy 2 Stress import info, for example highlight increase opacity of hovered links, nodes;
Strategy 3 Play down non-important info, for example reduce opacity of non -hovered nodes;