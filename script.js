$('.subhead').hide();
function handleSubmit(){
    let doctor_type=$('#doctor-type').val();
    let doctor_location=$('#location').val();
    console.log(doctor_type);
    console.log(doctor_location);
    const body = {
        search: doctor_type,
        area: doctor_location
      };
      $.ajax({
        url: "https://doctorsearchweb.000webhostapp.com/webservice.php",
        type: "POST",
        data: body,
        dataType: "json",
        success: function(data) {
          $('.doctors').empty();
          $('.subhead').show();
          $('.doctors').show();
          $('.subhead').text('Doctors Found In Your Area')
          Object.keys(data).map((datakey)=>{
            if(datakey=='Result'){
              if(data['Result']=='False'){
                $('.doctors').hide();
                $('.subhead').text('No Doctor found.')
              }
            }
            else if(datakey=='Message'){
              console.log('Message');
            } 
            else{
              $('.doctors').append(`<div class="doctorbox">
              <div class="leftside">
                  <img
                      class="smiling-doctor-with-strethosco-icon"
                      alt="image"
                      src="${data[datakey].DoctorImage}"
                  />
              </div>
              <div class="rightside">
                  <p class="drname">${data[datakey].DoctorName}</p>
                  <p>${data[datakey].DoctorInfo}</p>
              </div>
          </div>`)
          }
          })
          console.log(data);
        },
        error: function(xhr, status, error) {
          console.log("Error:", error);
        }
      });
      
}