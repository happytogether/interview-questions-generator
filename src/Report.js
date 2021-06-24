import "./Report.scss";
import RandomBg from "./RandomBg";
import Smile from "./components/shapes/Smile";
import Sad from "./components/shapes/Sad";

function Report() {
  return (
    <div className={`report h-screen py-4 rainbow-bg`}>
      <div className="grid grid-cols-10 gap-4 p-10 bg-white h-full">
        <div className="col-span-3"><Smile color="#000" /></div>
        <div className="col-span-7"><span className="text-2xl">86% Fit <br />Anni's Interview Report</span></div>
        <div className="col-span-2">Technical Questions</div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1"><Sad color="var(--gray)" /></div>
        <div className="col-span-1">2-9</div>
        <div className="col-span-2">UX Questions</div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1">3-4</div>
        <div className="col-span-1">3-5</div>
        <div className="col-span-1">3-6</div>
        <div className="col-span-1">3-7</div>
        <div className="col-span-1">3-8</div>
        <div className="col-span-1">3-9</div>
        <div className="col-span-2">4-1</div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1">4-3</div>
        <div className="col-span-1">4-4</div>
        <div className="col-span-1">4-5</div>
        <div className="col-span-1">4-6</div>
        <div className="col-span-1">4-7</div>
        <div className="col-span-1">4-8</div>
        <div className="col-span-1">4-9</div>
        <div className="col-span-2">5-1</div>
        <div className="col-span-1"><Smile color="#000" /></div>
        <div className="col-span-1">5-3</div>
        <div className="col-span-1">5-4</div>
        <div className="col-span-1">5-5</div>
        <div className="col-span-1">5-6</div>
        <div className="col-span-1">5-7</div>
        <div className="col-span-1">5-8</div>
        <div className="col-span-1">5-9</div>
      </div>
    </div>

  );
}

export default Report;
