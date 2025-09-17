

const SubNav = () => {

  const handleButton1Click = () => {
    console.log('Button 1 clicked');
  };

  const handleButton2Click = () => {
    console.log('Button 2 clicked');
  };

  return (
    <div
      style={{
        textAlign: 'center',
        background: '#ffffff',
        width: '100%',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      <button
        className="buttonSubNav"
        onClick={handleButton1Click}
        style={{
         
         background:"white",
          color: '#333',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: "16px",
          fontWeight:"600"
        }}
      >
        Trả lời câu hỏi
      </button>
      <button
        className="buttonSubNav"
        onClick={handleButton2Click}
        style={{
          background:"white",
          color: '#333',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer',
           fontSize: "16px",
          fontWeight:"600"
        }}
      >
       Kết quả tầm soát
      </button>
    </div>
  );
};

export default SubNav;
