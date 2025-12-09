import { useNavigate } from 'react-router-dom';

function ProductList({ products }) {
  const navigate = useNavigate();
  
  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>상품이 없습니다.</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{marginBottom: '20px'}}>베스트 상품</h2>
      
      {/* ★ grid 클래스 적용: 자동으로 4열 배치 ★ */}
      <div className="grid">
        {products.map((product) => (
          // ★ card 클래스 적용: 올리브영 스타일 카드 ★
          <div key={product.id} className="card" onClick={() => navigate(`/detail/${product.id}`)}>
            
            {/* ★ card-img 클래스 적용 ★ */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="card-img"
            />
            
            <div className="card-body">
              <div className="card-title">{product.name}</div>
              <div className="card-desc">{product.brand}</div>
              <div className="card-price">{Number(product.price).toLocaleString()}원</div>
            </div>

            {/* 버튼은 카드 전체 클릭이 되므로 제거하거나, 필요시 card-body 안에 btn 클래스로 추가 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

// import { useNavigate } from 'react-router-dom';

// function ProductList({ products }) {
//   const navigate = useNavigate();
  
//   // 데이터 없을 때 안내
//   if (products.length === 0) {
//     return (
//       <div style={{ textAlign: 'center', padding: '50px' }}>
//         <h2>상품이 없습니다.</h2>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>상품 목록</h2>
      
//       <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//         {products.map((product) => (
//           <div key={product.id} style={{ border: '1px solid black', padding: '10px' }}>
            
//             <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px' }} />
            
//             <h3>{product.name}</h3>
//             <p>{product.brand}</p>
//             <p>{product.price}원</p>
//             <button onClick={() => navigate(`/detail/${product.id}`)}>
//               상세 보기
//             </button>
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;