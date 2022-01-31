const RoundCounter = (props) => {
  return (props.percent!==0 && <div className="characters">
          <div className={props.count >= 0 ? "circle-wrap" : "circle-red circle-wrap"} style={{"--deg": props.percent}}>
              <div className="circle">
                  <div className="mask full">
                      <div className="fill"> </div>
                  </div>
                  <div className="mask half">
                      <div className="fill"> </div>
                  </div>
                  <div className="inside-circle">{props.count<10 && <span className={props.count >= 0 ? "text-orange" : "text-red"}>{props.count} </span> }
                  </div>
              </div>
          </div>
      </div>
  )
}
export default RoundCounter;