const xhr=new XMLHttpRequest();//create a new request or message to send to the backend
xhr.addEventListener('load',()=>{
  console.log(xhr.response);
});//xhr.addEventListner waits for the response to be fully loaded and then runs the  lambda function
xhr.open('GET','https://supersimplebackend.dev/products/first');//sets up the request 
xhr.send();//send the request to the  backend computer via internet