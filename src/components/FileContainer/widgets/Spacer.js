import React, { Component } from 'react';

export default function Spacer (props = {}) {
    const width = props.width || '1rem';
    return <div style={{ width }}></div>;
}
