<?php
// database details
$servername = "localhost";
$username = "id20777667_doctors";
$password = "2020@.coM";
$database = "id20777667_doctors";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// post request data
$doctor_category=$_POST["search"];
$doctor_area=$_POST["area"];

// SQL Query to get doctors data
$sql="SELECT ID,Doctorname,Doctorinformation,Doctorimage from doctors where Doctorarea like '%".$doctor_area."%' and Doctorcategory like '%".$doctor_category."%'";

$result=$conn->query($sql);

// Checking if any data present or not
if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        $doctor_id=$row["ID"];
        $doctor_data["DoctorName"]=$row["Doctorname"];
        $doctor_data["DoctorInfo"]=$row["Doctorinformation"];
        $doctor_data["DoctorImage"]=$row["Doctorimage"];
        $data[$doctor_id]=$doctor_data;
        $data["Result"]="True";
        $data["Message"]="Doctors fetched successfully.";
    }
}
else{
    $data["Result"]="False";
    $data["Message"]="No Doctors Found";
}

// sending response in JSON format.
echo json_encode($data,JSON_UNESCAPED_SLASHES);
?>



