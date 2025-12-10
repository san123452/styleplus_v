import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductList from './pro_components/ProductList.jsx';
import ProductDetail from './pro_components/ProductDetail.jsx';
import Order from './cart_components/Order'
import Cart from './cart_components/Cart'
import Done from './cart_components/Done'
import Header from './main_components/header.jsx'
import Addmain from './main_components/Addmain.jsx'
import Login from './user_components/Login'
import Regist from './user_components/regist.jsx'
import Settings from './user_components/Settings'
import EditUser from './user_components/EditUser'
import DeleteUser from './user_components/DeleteUser'
import MainPage from './user_components/MainPage'
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // ⭐ [수정 1] userId 상태 추가 (초기값은 로컬스토리지에서)
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  // 로그인 상태 유지 확인
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  // 로그인 핸들러
  const handleLogin = (id, name) => {
    localStorage.setItem('userId', id);
    localStorage.setItem('userName', name);
    setIsLoggedIn(true);
    setUserId(id);
    setUserName(name);
    setUserId(id);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserId('');
    setUserName('');
    alert("로그아웃 되었습니다.");
  };

  // 수정 2장바구니 추가 함수 정의
  const handleAddToCart = (productId, amount) => {
    
    // 1. 전체 상품 목록(products)에서 현재 담으려는 상품 찾기
    const targetProduct = products.find(p => String(p.id) === String(productId));

    if (!targetProduct) {
        console.error("상품 정보를 찾을 수 없습니다.");
        return;
    }

    console.log(`장바구니 담기: ${targetProduct.name}, 가격: ${targetProduct.price}, 수량: ${amount}`);

    fetch('http://localhost:8080/pro/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pId: productId,
        id: userId,
        amount: amount,
        pName: targetProduct.name,   
        pPrice: targetProduct.price, 
        img: targetProduct.image     
      })
    })
    .then(res => res.json())
    .then(data => {
       if(data.result) {
         if(window.confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
            // window.location.href = '/cart';
         }
       } else {
         alert("장바구니 담기 실패");
       }
    })
    .catch(err => {
        console.error(err);
        alert("오류가 발생했습니다.");
    });
  };
  
  const handleAddReview = (productId, rating, content) => {
    fetch('http://localhost:8080/pro/addreview', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        rating,
        content,
        userName: userName,
        userId: userId 
      })
    })
      .then(res => res.json())
      .then(newReviewList => {
        setReviews(newReviewList);
        alert("리뷰 작성이 완료되었습니다.");
      })
      .catch(error => {
        console.error("리뷰 작성 중 오류 발생:", error);
        alert("리뷰 작성 실패.");
      });
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8080/pro/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("상품 로딩 실패:", error);
        setProducts([]);
      }
    }

    async function fetchReviews() {
      try {
        const response = await fetch('http://localhost:8080/pro/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("리뷰 로딩 실패:", error);
      }
    }

    fetchProducts();
    fetchReviews();
  }, []);

  return (
    <>
    <BrowserRouter>
      <Header 
        isLoggedIn={isLoggedIn} 
        userName={userName} 
        onLogout={handleLogout} 
      />
      
      <div className="container">
        <Routes>
          <Route path='/order' element={<Order />}/>
          <Route path='/done' element={<Done />}/>
          <Route path='/addmain' element={<Addmain />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<Login onLogin={handleLogin} />}/>
          <Route path='/regist' element={<Regist />}/>
          <Route path='/mainpage' element={<MainPage />}/>
          <Route path='/settings' element={<Settings />}/>
          <Route path='/settings/edit' element={<EditUser />}/>
          <Route path='/settings/delete' element={<DeleteUser />}/>
          <Route path="/" element={<ProductList products={products}/>} />
          
          <Route path='/detail/:productId' element={
            <ProductDetail
              products={products}
              reviews={reviews}
              onAddReview={handleAddReview}
              // ⭐ [수정 3] 여기서 함수와 ID를 꼭 넘겨줘야 합니다!
              onAddToCart={handleAddToCart} 
              userId={userId} 
            />
          } />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App

