import 'antd/dist/antd.min.css';
import './main.scss';
import { API_URL } from '../config/constants';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';

function MainPage(){
    const [ products, setProducts ] = useState([]);
    // 배너 이미지 state로 관리
    const [ banners, setBanners ] = useState([]);

    useEffect(()=>{
        // server의 get방식으로 지정해준 주소와 똑같은 주소를 적어줘야 함 (/products)
        axios.get(`${API_URL}/products/`)
        .then(function(result){
            // 받는쪽과 보내주는 쪽의 이름이 product로 같아야 데이터를 받아올 수 있음
            const products = result.data.product;
            console.log(products);
            setProducts(products);
        }).catch(function(error){
            console.log(error);
        });

        axios.get(`${API_URL}/banners/`)
        .then((result) => {
            const banner = result.data.banners;
            setBanners(banner);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [])
    
    return (
        <div id="main">
            <Carousel autoplay={true} autoplaySpeed={3000}>
                {banners.map((banner, index) => {
                    return (
                        <div id="visual" key={index}>
                            <img src={`${API_URL}${banner.imageUrl}`} alt="최신조명" />
                        </div>
                    );
                })}
            </Carousel>
            <div id="product" className="innerCon">
                <h1>그린 조명 최신상품</h1>
                <div id="product-list">
                    {
                    products.map(product => {
                        return (
                            <div className="product-card" key={product.id}>
                                <Link to = {`/products/${product.id}`}>
                                <div>
                                    <img className="product-img" src={product.imageUrl} alt="조명" />
                                </div>
                                <div className="product-contents">
                                    <span>{product.name}</span>
                                    <span>{product.price}원</span>
                                    <div>
                                        <img className="product-avatar" src="images/icons/avatar.png" alt="아이콘" />
                                        <span>{product.seller}</span>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        </div>
    );
}
export default MainPage;