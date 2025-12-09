import { useState } from "react";

function EditUser() {
    // 상태 선언
    const [userId, setUserId] = useState("");
    const [newUserId, setNewUserId] = useState(""); 
    const [pw, setPw] = useState("");
    const [nickname, setNickname] = useState(""); 
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
   
    // 회원정보 수정
    async function updateUsers() {
        if (!userId) {
            alert("아이디를 입력하세요.")
            return;
        }
        
        const res = await fetch("http://localhost:8080/users/edit", {
            method: "PUT",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({
                old_user_id: userId,
                new_user_id: newUserId || userId,
                user_pw: pw,
                user_nickname: nickname,
                user_name: name,
                user_gender: gender,
                user_dob: dob,
                user_phone: phone
            })
        });

        const data = await res.json();
        alert (data.result ? "회원 정보 수정 완료":"수정 실패");
    }        

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>회원정보 수정</h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* 각 항목마다 라벨 추가해서 보기 좋게 정렬 */}
                <div>
                    <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>현재 아이디</label>
                    <input className="input" value={userId} placeholder="수정할 계정의 아이디를 입력하세요" onChange={(e)=>setUserId(e.target.value)} />
                </div>

                <div>
                    <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>닉네임 변경</label>
                    <input className="input" value={nickname} placeholder="변경할 닉네임" onChange={(e)=>setNickname(e.target.value)} />
                </div>

                <div>
                    <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>비밀번호 변경</label>
                    <input className="input" type="password" value={pw} placeholder="변경할 비밀번호" onChange={(e)=>setPw(e.target.value)} />
                </div>

                <div>
                    <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>생년월일</label>
                    <input className="input" value={dob} placeholder="YYYY-MM-DD" onChange={(e)=>setDob(e.target.value)}/>
                </div>

                <div>
                    <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>이름</label>
                    <input className="input" value={name} placeholder="이름" onChange={(e)=>setName(e.target.value)} />
                </div>

                <div>
                    <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>성별</label>
                    <div style={{ display: 'flex', gap: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                        <label style={{ cursor: 'pointer' }}>
                            <input type="radio" name="gender" value="M" onChange={(e)=>setGender(e.target.value)} /> 남성
                        </label>
                        <label style={{ cursor: 'pointer' }}>
                            <input type="radio" name="gender" value="F" onChange={(e)=>setGender(e.target.value)} /> 여성
                        </label>
                    </div>
                </div>

                <div>
                    <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>전화번호</label>
                    <input className="input" type="tel" value={phone} placeholder="010-0000-0000" onChange={(e) => setPhone(e.target.value)} />
                </div>

                <button className="btn" style={{ marginTop: '20px' }} onClick={updateUsers}>수정하기</button>
            </div>
        </div>
    );
}

export default EditUser;

// import { useState } from "react";



// function EditUser() {

//     // 상태 선언
//     const [userId, setUserId] = useState(""); // 기존 아이디
//     const [newUserId, setNewUserId] = useState(""); // 새로 변경할 아이디
//     const [pw, setPw] = useState("");
//     const [nickname, setNickname] = useState(""); 
//     const [name, setName] = useState("");
//     const [gender, setGender] = useState("");
//     const [dob, setDob] = useState("");
//     const [phone, setPhone] = useState("");
   
    
//     // 회원정보 수정
//     async function updateUsers() {
//         if (!userId) {
//             alert("아이디를 입력하세요.")
//             return;
//         }
        
//         // fetch 요청
//         const res = await fetch("http://localhost:8080/users/edit", {
//             method: "PUT",
//             headers: { "Content-Type":"application/json" },
//             body: JSON.stringify({
//                 old_user_id: userId,
//                 new_user_id: newUserId || userId, // 새 아이디 혹은 새 아이디가 없으면 기존 아이디 사용
//                 user_pw: pw,
//                 user_nickname:nickname,
//                 user_name: name,
//                 user_gender: gender,
//                 user_dob: dob,
//                 user_phone: phone

//             })
//         });

//         const data = await res.json();
        
//             alert (data.result ? "회원 정보 수정 완료":"수정 실패");
         
//     }        

// return (
 
//             // 수정 div 
//             <div>
//                 <h1>회원설정 페이지</h1>
//             <h2>회원정보 수정</h2>
//             아이디 : <input value={userId} placeholder="아이디를 입력하세요" onChange={(e)=>setUserId(e.target.value)} /> <br />

//             닉네임 : <input value={nickname} placeholder="변경할 닉네임을 입력하세요" onChange={(e)=>setNickname(e.target.value)} /> <br />

//             {/* 새아이디 : <input value={newUserId} placeholder="새아이디를 입력하세요" onChange={(e)=>setNewUserId(e.target.value)} /> <br /> */}
            
            
//              비밀번호 : <input value={pw} placeholder="변경할 password를 입력하세요" onChange={(e)=>setPw(e.target.value)} /> <br />
            
//              생년월일 :   <input value={dob} placeholder="YYYY-MM-DD" onChange={(e)=>setDob(e.target.value)}/> <br />
                                                           
//              이름 : <input value={name} placeholder="성함을 입력하세요"onChange={(e)=>setName(e.target.value)} /> <br />
                
//              성별 : 남성 <input type="radio" name="gender" value="M" onChange={(e)=>setGender(e.target.value)} /> <br />
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 여성 <input type="radio" name="gender" value="F" onChange={(e)=>setGender(e.target.value)} /> <br />
                      
//              전화번호 : <input type="tel" value={phone} pattern="010-[0-9]{4}-[0-9]{4}" placeholder="010-1234-5678" onChange={(e) => setPhone(e.target.value)} /> <br />

//              <button onClick={updateUsers}>회원정보 수정</button>


//             </div>



// );


    
    

// }
//     export default EditUser