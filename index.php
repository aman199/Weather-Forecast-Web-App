<?php 
   
header("Access-Control-Allow-Origin:*");
      $url = "https://maps.google.com/maps/api/geocode/xml?address=".$_GET["StreetAddress"].",".$_GET["city"].",".$_GET["state"]."&key=AIzaSyDLyVOxnA4OefQnFzaD5ikRvcFyRvhQpVY";
    $xml = simplexml_load_file($url);

    if($_GET["degree"])
        $unit=$_GET["degree"];
    if($unit=="Celsius")
        $unit_value="si";
    else   
        $unit_value="us";

    $fore_url="https://api.forecast.io/forecast/0e83928730899a73a0c44cf95a8e6158/".$xml->result->geometry->location->lat.",".$xml->result[0]->geometry->location->lng."?units=".$unit_value."&exclude=flags";

    $result=file_get_contents($fore_url);
    echo $result;

?>