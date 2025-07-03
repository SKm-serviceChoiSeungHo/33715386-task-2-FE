import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { searchPeople, getPeopleDetails } from '../api';
import PersonDetail from './PersonDetail';

function SearchInput() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [details, setDetails] = useState([]);
    const [autocomplete, setAutocomplete] = useState('');


    const debouncedSearch = useCallback(
        debounce(async (q) => {
            if (!q.trim()) {
                setResults([]);
                setAutocomplete('');
                setDetails([]);
                return;
            }
            const matched = await searchPeople(q);
            setResults(matched);
            setAutocomplete(matched.length > 0 ? matched[0].name : '');
        }, 300),
        [] // 한 번만 생성
    );

    const handleInput = (e) => {
        const q = e.target.value;
        setQuery(q);
        debouncedSearch(q); // 디바운스된 함수 호출
    };

    const handleClickName = async (name) => {
        const detailData = await getPeopleDetails(name);
        setDetails(detailData);
    };

    return (
        <>
            <div className="search-container">
                <div className="autocomplete-overlay">
                    <span style={{ color: 'transparent' }}>{query}</span>
                    <span className="autocomplete-hint">
            {autocomplete.slice(query.length)}
          </span>
                </div>
                <input
                    type="text"
                    id="searchInput"
                    placeholder="이름을 입력하세요..."
                    value={query}
                    onChange={handleInput}
                    autoComplete="off"
                />
            </div>

            <div className="results-container">
                <div className="results-title">검색 결과:</div>
                <ul className="results-list">
                    {results.length === 0 ? (
                        <li className="no-results">
                            {query.trim() ? '검색 결과가 없습니다' : '검색어를 입력해주세요'}
                        </li>
                    ) : (
                        results.map((r) => (
                            <li key={r.id} onClick={() => handleClickName(r.name)}>
                                {r.name}
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {details.length > 0 && (
                <div className="results-container">
                    <div className="results-title">📋 상세 정보:</div>
                    {details.map((d) => (
                        <PersonDetail key={d.id} person={d} />
                    ))}
                </div>
            )}
        </>
    );
}

export default SearchInput;