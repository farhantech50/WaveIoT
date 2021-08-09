let cleanBtn=document.getElementById("btn");
cleanBtn.addEventListener('click', async ()=> {
    fetch('/clean', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        alert("Database cleaned successfully")
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
  });