class Rim{
    constructor(x,y,width,height){
        var options = {
            isStatic : true,
        }
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x,y,this.width,this.height,options);
        World.add(world,this.body);
    }
    display(){
        var pos = this.body.position;

        noStroke();
        rectMode(CENTER);
        fill(229,118,66);
        rect(pos.x,pos.y,this.width,this.height);
    }
}