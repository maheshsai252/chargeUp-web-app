import { useRef, useEffect } from "react";
import '../../css/createEvent.scss';

const AutoComplete = (props) => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"]
   };
 useEffect(() => {

  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   options
  );
  autoCompleteRef.current.addListener("place_changed", async function () {
   const place = await autoCompleteRef.current.getPlace();
   console.log({ place });
    props.setPlace(place);
    props.setStatus("");
  });
 }, []);
 return (
  <div>
   <input className="spl-input" style={{width:'70%'}} ref={inputRef}/>
    {props.place===undefined ? <p style={{padding: '10px'}}className="alert-online">Empty location is considered online</p> : <p></p>}
  </div>
 );
};
export default AutoComplete;