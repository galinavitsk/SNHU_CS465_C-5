
const tripsEndpoint='http://localhost:3000/api/trips';
const options={
    method:'GET',
    headers:{'Accept':'application/json'}
};
const travel = async function (req,res){
    await fetch(tripsEndpoint,options)
    .then(res=>res.json())
    .then(data=>
        {
            message="";
            if(!(data instanceof Array)){
                message='API lookup error';
                data=[];
            }else{
                if(!data.length){
                    message='No trips exist in our database!';
                }
            }
            res.render('travel',{title:"Travlr Getaways",trips:data,message:message})})
    .catch(err=>res.status(500).send(err.message));
};

module.exports={travel}