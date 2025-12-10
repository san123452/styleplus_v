import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, userName, onLogout }) {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch('http://localhost:8080/pro/products');
            const result = await response.json();
            setData(Array.isArray(result[0]) ? result[0] : result);
        }
        fetchProducts();
    }, []);

    const handleLogout = () => {
        onLogout();
        alert('로그아웃 되었습니다.');
        navigate('/');
    };

    const filterData = data.filter(item =>
        (item.name || "").toLowerCase().includes((search || "").toLowerCase())
    );

    function onClick() {
        console.log("검색", filterData);
    }

    return (
        // ★ header 클래스 적용 ★
        <header className="header">
            {/* 로고 영역 */}
            <div className="logo">
                <Link to="/" style={{textDecoration:'none', color:'var(--main-color)'}}>OLIVE YONG</Link>
            </div>

            {/* 검색창 영역 (가운데 배치 느낌으로) */}
            <div style={{display:'flex', gap:'5px', flexGrow: 1, maxWidth:'400px', margin:'0 20px'}}>
                <input 
                    type="text" 
                    className="input" // ★ input 스타일 적용
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="상품을 검색하세요" 
                />
                <button className="btn" onClick={onClick}>🔍</button> {/* ★ btn 스타일 적용 */}
            </div>
            
            {/* 메뉴 영역 */}
            <nav className="nav">
                {isLoggedIn ? (
                    <>
                        <span style={{ fontWeight: 'bold', color:'var(--main-color)' }}>{userName}님</span>
                        <Link to="/cart">장바구니</Link>
                        <Link to="/settings">마이페이지</Link>
                        <button className="btn" style={{padding:'5px 10px', fontSize:'12px'}} onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/regist">회원가입</Link>
                        <Link to="/cart">장바구니</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Header({ isLoggedIn, userName, onLogout }) {
//     const [search, setSearch] = useState("");
//     const [data, setData] = useState([]);
//     const navigate = useNavigate();

//     // 상품 데이터 로드
//     useEffect(() => {
//         async function fetchProducts() {
//             const response = await fetch('http://localhost:8080/pro/products');
//             const result = await response.json();
//             setData(Array.isArray(result[0]) ? result[0] : result);
//         }
//         fetchProducts();
//     }, []);

//     // 로그아웃 핸들러
//     const handleLogout = () => {
//         onLogout();  // ✅ 부모 함수 호출
//         alert('로그아웃 되었습니다.');
//         navigate('/');
//     };

//     // 검색 필터링
//     const filterData = data.filter(item =>
//         (item.name || "").toLowerCase().includes((search || "").toLowerCase())
//     );

//     function onClick() {
//         console.log("검색", filterData);
//     }

//     return (
//         <>
//             <header id="Header">
//                 <div className="main">
//                     <ul>
//                         {isLoggedIn ? (
//                             <>
//                                 <li style={{ fontWeight: 'bold' }}>{userName}님</li>
//                                 <li><button onClick={handleLogout}>로그아웃</button></li>
//                                 <li><Link to="/cart">장바구니</Link></li>
//                                 <li><Link to="/settings">마이페이지</Link></li>
//                             </>
//                         ) : (
//                             <>
//                                 <li><Link to="/login">로그인</Link></li>
//                                 <li><Link to="/regist">회원가입</Link></li>
//                                 <li><Link to="/cart">장바구니</Link></li>
//                             </>
//                         )}
//                     </ul>
//                 </div>
//                 <div className="logo">
//                     <h1><Link to="/">로고</Link></h1>
//                     <input 
//                         type="text" 
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)} 
//                         placeholder="상품 검색하세요" 
//                     />
//                     <button onClick={onClick}>🔍</button>
//                 </div>
                
//                 <div className="menubox">
//                     <ul>
//                         <li><Link to="/">전체메뉴</Link></li>
//                     </ul>
//                     <ul>
//                         <li><Link to="/">베스트</Link></li>
//                     </ul>
//                     <ul>
//                         <li><Link to="/">신제품</Link></li>
//                     </ul>
//                     <ul>
//                         <li><Link to="/">고객지원</Link></li>
//                     </ul>
//                 </div>
//             </header>
//         </>
//     )
// }

// export default Header;