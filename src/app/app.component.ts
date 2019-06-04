import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as d3 from "d3";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{
    title = 'myFirstApp';
    private svg: d3.Selection<SVGElement>;
    private g: d3.Selection<SVGElement>;
    private margin = { top: 20, right: 20, bottom: 200, left: 70 };

    @ViewChild('svg') private svgContainer: ElementRef;

    private width: number;
    private height: number;
    private categories= [];
    private catsUnfiltered= []; 
    private timeScale: any;
    private taskArray = [];


    constructor(private elem: ElementRef) {
        this.width = 800;
        this.height = 600;
        this.taskArray = [
            {
                task: "conceptualize",
                type: "development",
                startTime: "2013-1-28", //year/month/day
                endTime: "2013-2-1",
                details: "This actually didn't take any conceptualization"
            },
            
            {
                task: "sketch",
                type: "development",
                startTime: "2013-2-1",
                endTime: "2013-2-6",
                details: "No sketching either, really"
            },
            
            {
                task: "color profiles",
                type: "development",
                startTime: "2013-2-6",
                endTime: "2013-2-9"
            },
            
            {
                task: "HTML",
                type: "coding",
                startTime: "2013-2-2",
                endTime: "2013-2-6",
                details: "all three lines of it"
            },
            
            {
                task: "write the JS",
                type: "coding",
                startTime: "2013-2-6",
                endTime: "2013-2-9"
            },
            
            {
                task: "advertise",
                type: "promotion",
                startTime: "2013-2-9",
                endTime: "2013-2-12",
                details: "This counts, right?"
            },
            
            {
                task: "spam links",
                type: "promotion",
                startTime: "2013-2-12",
                endTime: "2013-2-14"
            },
            {
                task: "eat",
                type: "celebration",
                startTime: "2013-2-8",
                endTime: "2013-2-13",
                details: "All the things"
            },
            
            {
                task: "crying",
                type: "celebration",
                startTime: "2013-2-13",
                endTime: "2013-2-16"
            },
        ];
        
    }

    ngOnInit() {
        this.createGantt();
    }

    createGantt() {
        const svgElement = this.svgContainer.nativeElement;
        this.svg = d3.select(svgElement).append("svg").attr("width", this.width).attr("height", this.height).attr("class", "svg");
        this.g = this.svg.append('g');


        for (let i = 0; i < this.taskArray.length; i++){
            this.categories.push(this.taskArray[i].type);
        }

        this.catsUnfiltered = this.categories; //for vert labels
        
        this.categories = this.checkUnique(this.categories);
        
        this.makeGant(this.taskArray, this.width, this.height);

        let title = this.svg.append("text")
                    .text("Gantt Chart Process")
                    .attr("x", this.width/2)
                    .attr("y", 25)
                    .attr("text-anchor", "middle")
                    .attr("font-size", 18)
                    .attr("fill", "#009FFC");
    }

    public makeGant(tasks, pageWidth, pageHeight) {
        console.log("inside make gantt function");
        
        var barHeight = 20;
        var gap = barHeight + 4;
        var topPadding = 75;
        var sidePadding = 75;
        
        var colorScale = d3.scale.linear<string>()
            .domain([0, this.categories.length])
            .range(["#00B9FA", "#F95002"])
            .interpolate(d3.interpolateHcl);

        this.makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
        this.drawRects(this.taskArray, gap, topPadding, sidePadding, barHeight, colorScale, pageWidth, pageHeight);
        this.vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
    }


    
    public makeGrid(theSidePad, theTopPad, w, h) {

        console.log("inside makeGrid categories", this.categories);
        let dateFormat = d3.time.format("%Y-%m-%d");

        this.timeScale = d3.time.scale()
            .domain([d3.min(this.taskArray, function(d) { console.log("parameter", d); return dateFormat.parse(d.startTime)}),
                    d3.max(this.taskArray, function(d) {return  dateFormat.parse(d.endTime)})])
            .range([0, this.width-150]);

        var xAxis = d3.svg.axis()
            .scale(this.timeScale)
            .orient('bottom')
            .ticks(d3.time.days, 1)
            .tickSize(-h+theTopPad+20, 0)
            .tickFormat(d3.time.format('%d %b'));
      
        var grid = this.svg.append('g')
            .attr('class', 'grid')
            .attr('transform', 'translate(' +theSidePad + ', ' + (h - 50) + ')')
            .call(xAxis)
            .selectAll("text")  
            .style("text-anchor", "middle")
            .attr("fill", "#000")
            .attr("stroke", "none")
            .attr("font-size", 10)
            .attr("dy", "1em");
    }

    public drawRects(theArray, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, w, h) {
        console.log("inside drawRects function", theArray, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, w, h );
        
        let dateFormat = d3.time.format("%Y-%m-%d");

        let timeScale = d3.time.scale()
            .domain([d3.min(this.taskArray, function(d) { console.log("parameter", d); return dateFormat.parse(d.startTime)}),
                    d3.max(this.taskArray, function(d) {return  dateFormat.parse(d.endTime)})])
            .range([0, this.width-150]);
            
            var bigRects = this.svg.append("g")
                .selectAll("rect")
                .data(theArray)
                .enter()
                .append<SVGRectElement>("rect")
                .attr("x", 0)
                .attr("y", function(d, i) {
                    return i*theGap + theTopPad - 2;
                })
                .attr("width", function(d){
                    return w-theSidePad/2;
                })
                .attr("height", theGap)
                .attr("stroke", "none")
                .attr("fill", d => {
                    for (var i = 0; i < this.categories.length; i++){
                        if (d.type == this.categories[i]){
                            return d3.rgb(theColorScale(i));
                        }
                    }
                })
                .attr("opacity", 0.2);
                
                
            var rectangles = this.svg.append<SVGRectElement>('g')
                .selectAll("rect")
                .data(theArray)
                .enter();
            
        
           var innerRects = rectangles.append("rect")
                .attr("rx", 3)
                .attr("ry", 3)
                .attr("x", function(d){
                    return timeScale(dateFormat.parse(d.startTime)) + theSidePad;
                })

                .attr("y", function(d, i){
                    return i*theGap + theTopPad;
                })
                .attr("width", function(d){
                return (timeScale(dateFormat.parse(d.endTime)) - timeScale(dateFormat.parse(d.startTime)));
                })
                .attr("height", theBarHeight)
                .attr("stroke", "none")
                .attr("fill", "gray")
           
        
            var rectText = rectangles.append("text")
                .text(function(d){
                    return d.task;
                })
                .attr("x", function(d){
                return (timeScale(dateFormat.parse(d.endTime))-timeScale(dateFormat.parse(d.startTime)))/2 + timeScale(dateFormat.parse(d.startTime)) + theSidePad;
                })
                .attr("y", function(d, i){
                    return i*theGap + 14+ theTopPad;
                })
                .attr("font-size", 11)
                .attr("text-anchor", "middle")
                .attr("text-height", theBarHeight)
                .attr("fill", "#fff");

        
            rectText.on('mouseover', function(e) {
                var tag = "";
        
                 if (d3.select(this).data()[0].details != undefined){
                  tag = "Task: " + d3.select(this).data()[0].task + "<br/>" + 
                        "Type: " + d3.select(this).data()[0].type + "<br/>" + 
                        "Starts: " + d3.select(this).data()[0].startTime + "<br/>" + 
                        "Ends: " + d3.select(this).data()[0].endTime + "<br/>" + 
                        "Details: " + d3.select(this).data()[0].details;
                 } else {
                  tag = "Task: " + d3.select(this).data()[0].task + "<br/>" + 
                        "Type: " + d3.select(this).data()[0].type + "<br/>" + 
                        "Starts: " + d3.select(this).data()[0].startTime + "<br/>" + 
                        "Ends: " + d3.select(this).data()[0].endTime;
                 }
                 var output = document.getElementById("tag");
        
                  var x = this.x.animVal.getItem(this) + "px";
                  var y = this.y.animVal.getItem(this) + 25 + "px";
        
                 output.innerHTML = tag;
                 output.style.top = y;
                 output.style.left = x;
                 output.style.display = "block";
               }).on('mouseout', function() {
                 var output = document.getElementById("tag");
                 output.style.display = "none";
                     });



                innerRects.on('mouseover', function(e) {
                //console.log(this);
                var tag = "";
                
                if (d3.select(this).data()[0].details != undefined){
                    tag = "Task: " + d3.select(this).data()[0].task + "<br/>" + 
                    "Type: " + d3.select(this).data()[0].type + "<br/>" + 
                    "Starts: " + d3.select(this).data()[0].startTime + "<br/>" + 
                    "Ends: " + d3.select(this).data()[0].endTime + "<br/>" + 
                    "Details: " + d3.select(this).data()[0].details;
                } else {
                    tag = "Task: " + d3.select(this).data()[0].task + "<br/>" + 
                    "Type: " + d3.select(this).data()[0].type + "<br/>" + 
                    "Starts: " + d3.select(this).data()[0].startTime + "<br/>" + 
                    "Ends: " + d3.select(this).data()[0].endTime;
                }
                var output = document.getElementById("tag");
                
                var x = (this.x.animVal.value + this.width.animVal.value/2) + "px";
                var y = this.y.animVal.value + 25 + "px";
                
                output.innerHTML = tag;
                output.style.top = y;
                output.style.left = x;
                output.style.display = "block";
            }).on('mouseout', function() {
                var output = document.getElementById("tag");
                output.style.display = "none";
                
            });
    }

    public vertLabels(theGap, theTopPad, theSidePad, theBarHeight, theColorScale){
        
        var numOccurances = new Array();
        var prevGap = 0;
      
        for (var i = 0; i < this.categories.length; i++){
          numOccurances[i] = [this.categories[i], this.getCount(this.categories[i], this.catsUnfiltered)];
        }
      
        var axisText = this.svg.append("g") //without doing this, impossible to put grid lines behind text
            .selectAll("text")
            .data(numOccurances)
            .enter()
            .append<SVGTextElement>("text")
            .text(function(d){
                return d[0];
            })
            .attr("x", 10)
            .attr("y", function(d, i){
                if (i > 0){
                    for (var j = 0; j < i; j++) {
                        prevGap += numOccurances[i-1][1];
                        // console.log(prevGap);
                        return d[1]*theGap/2 + prevGap*theGap + theTopPad;
                    }
                } else{
                    return d[1]*theGap/2 + theTopPad;
                }
            })
         .attr("font-size", 11)
         .attr("text-anchor", "start")
         .attr("text-height", 14)
         .attr("fill", function(d){
          for (var i = 0; i < this.categories.length; i++){
              if (d[0] == this.categories[i]){
              //  console.log("true!");
                return d3.rgb(theColorScale(i)).darker();
              }
          }
         });
      
      }
        
    
    public checkUnique(arr) {
        var hash = {}, result = [];
        for ( var i = 0, l = arr.length; i < l; ++i ) {
            if ( !hash.hasOwnProperty(arr[i]) ) { //it works with objects! in FF, at least
                hash[ arr[i] ] = true;
                result.push(arr[i]);
            }
        }
        return result;
    }

    public getCounts(arr) {
        var i = arr.length, // var to loop over
            obj = {}; // obj to store results
        while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
        return obj;
    } 

    public getCount(word, arr) {
        return this.getCounts(arr)[word] || 0;
    }
}


export interface TestItem {
    Country: string;
    Amount: number;
}