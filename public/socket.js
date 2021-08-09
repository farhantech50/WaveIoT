setInterval(()=>{
    const socket = io();
    socket.on("update",(data)=>{
        document.getElementById("show").innerHTML=data;
    })
},1000);
