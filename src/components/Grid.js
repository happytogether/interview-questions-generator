export default function Items(props) {

  const styles = {
    backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 34px,white 34px,white 35px),repeating-linear-gradient(-90deg,transparent,transparent 34px,white 34px,white 35px)",
    backgroundSize: "35px 35px",
    height: "300px",
    position: "absolute",
    width: "300px"
  }
  return (
    <div>
      <div className="grid" style={styles}></div>
    </div>
  )
}
