export default function squareLoader() {
  return (
    <>
    <div className="loader">
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </div>
    
    
    <style jsx>{`
    .loader {
        --size: 40px;
        display: flex;
        gap: 0.6rem;
       }
       
       .box {
        width: var(--size);
        height: var(--size);
        background: #0270e1;
        animation: rotate 2s infinite;
       }
       
       .box:nth-child(2) {
        animation-delay: 0.25s;
       }
       
       .box:nth-child(3) {
        animation-delay: 0.5s;
       }
       
       @keyframes rotate {
        50% {
         transform: rotate(180deg)
        }
       }`}</style></>
  );
}
