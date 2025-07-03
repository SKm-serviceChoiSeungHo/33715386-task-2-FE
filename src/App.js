import React from 'react';
import SearchInput from './components/SearchInput';
import './App.css';

function App() {
    return (
        <div className="container">
            <h1>이름 검색 시스템</h1>

            <div className="info">
                💡 이름을 입력하면 자동완성과 관련 결과를 확인할 수 있습니다.
            </div>

            <SearchInput />
        </div>
    );
}

export default App;
