import { API_URL } from "../config/constants";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './detail.scss';

function ProductView(){
    const [ product, setProduct ] = useState(null);
    const param = useParams();
    const { id } = param;
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(
            // 포스트맨에서 설정한 주소 (Route 주소랑은 다름)
            // `https://d9ea6e6c-8904-467a-91de-0d7624ec60e7.mock.pstmn.io/product/${id}`

            // green-lamp-server 주소
            `${API_URL}/products/${id}`
        ).then(function(result){
            console.log(result);
            setProduct(result.data.product);
        })
        .catch(function(error){
            console.log(error);
        })
    }, []);

    const productDel = () => {
        axios.delete(`${API_URL}/products/${id}`)
        .then(function(result){
            console.log("삭제되었습니다.");
            navigate(-1);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    if(product == null){
        return <div>상품정보를 받고 있습니다...</div>
    }

    return (
        <div className="innerCon" id="detail">
            <h1>{product.name}</h1>
            <div id="image-box">
                <img src={product.imageUrl} alt="제품" />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt="아이콘" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div>{product.name}</div>
                <div>{product.price}원</div>
                <div>{product.createdAt}</div>
                <div>{product.description}</div>
            </div>
            <div className="btn">
                <span onClick={productDel}>삭제하기</span>
            </div>
        </div>
    );
}

export default ProductView;