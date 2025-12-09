import { useNavigate } from "react-router-dom"; 

function Settings() {
    const navigate = useNavigate();

    function productclick() {
        navigate('/addmain')
    }

    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '30px' }}>회원설정</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button className="btn" onClick={productclick}>상품 등록 (관리자)</button>
            <button className="btn" onClick={() => navigate("/settings/edit")}>회원정보 수정</button>
            <button className="btn" style={{ backgroundColor: '#ff6b6b' }} onClick={() => navigate("/settings/delete")}>회원 탈퇴</button>
        </div>
      </div>
    );
}

export default Settings;

// import { Navigate, useNavigate } from "react-router-dom"; 

// function Settings() {
//     const navigate = useNavigate();

//     function productclick() {
//         navigate('/addmain')
//     }

//     return (

//      <div>

//         <h1>회원설정 선택</h1>
//         <button onClick={productclick}>상품등록창으로 이동</button>
//         <button onClick={() => navigate("/settings/edit")}>회원정보 수정</button> <br /> <br />
//          <button onClick={() => navigate("/settings/delete")}>회원정보 삭제</button>
//             {/* 결과 메세지 div
//             <div>

//             {resultMessage}

//             </div> */}

//         </div>
//     );

// }

// export default Settings