const travel = (req,res)=>{
    res.render('travel',{title:"Travlr Getaways",trips});
};

var fs =require('fs');
var trips=JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

module.exports={travel}