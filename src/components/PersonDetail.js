import React from 'react';

function PersonDetail({ person }) {
    return (
        <div className="person-card">
            <p><strong>이름:</strong> {person.name}</p>
            <p><strong>나이:</strong> {person.age}</p>
            <p><strong>성별:</strong> {person.gender}</p>
            <p><strong>국가:</strong> {person.country}</p>
        </div>
    );
}

export default PersonDetail;