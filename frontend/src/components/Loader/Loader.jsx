import './loader.css';

const Loader = ({ messages, blurOff }) => {
   return (
      <div
         className={`loader-container ${
            blurOff ? 'backdrop-blur-none' : 'backdrop-blur-[2px]'
         }`}
      >
         <div className="loader">
            <div className="spinner"></div>
            {messages}
         </div>
      </div>
   );
};

export default Loader;
