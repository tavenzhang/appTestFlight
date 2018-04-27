'use strict';
let React = require('react');
import Canvas from './Canvas'

let qr = require('qr.js');
let {
    View,
} = require('react-native');

function renderCanvas(canvas) {
    let ctx = canvas.getContext('2d');
    let size = this.size;
    let fgColor = this.fgColor;
    let bgColor = this.bgColor;
    canvas.width = size;
    canvas.height = size;
    canvas.style.left = (window.innerWidth - size) / 2 + 'px';
    if (window.innerHeight > size) canvas.style.top = (window.innerHeight - size) / 2 + 'px';
    ctx.fillRect(0, 0, size, size);
    let cells = this.cells;
    let cellWidth = this.size / cells.length;
    let cellHeight = this.size / cells.length;
    let nRoundedWidth = Math.round(cellWidth);
    let nRoundedHeight = Math.round(cellHeight);
    cells.forEach(function (row, rowIndex) {
        row.forEach(function (column, columnIndex) {
            let nLeft = columnIndex * cellWidth;
            let nTop = rowIndex * cellHeight;
            ctx.fillStyle = ctx.strokeStyle = column ? bgColor : fgColor;
            ctx.lineWidth = 1;
            ctx.fillRect(nLeft, nTop, cellWidth, cellHeight);
            ctx.strokeRect(
                Math.floor(nLeft) + 0.5,
                Math.floor(nTop) + 0.5,
                nRoundedWidth,
                nRoundedHeight
            );
            ctx.strokeRect(
                Math.ceil(nLeft) - 0.5,
                Math.ceil(nTop) - 0.5,
                nRoundedWidth,
                nRoundedHeight
            );
        });
    });
}

import PropTypes from 'prop-types'

export  default class QRCode extends React.Component {
    static propTypes: {
        value: PropTypes.string,
        size: PropTypes.number,
        bgColor: PropTypes.string,
        fgColor: PropTypes.string,
    }
    static defaultProps = {
        value: 'https://github.com/cssivision',
        fgColor: 'white',
        bgColor: 'black',
        size: 128,
    }

    utf16to8(str) {
        let out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    render() {
        let size = this.props.size;
        let value = this.utf16to8(this.props.value);

        return (
            <View>
                <Canvas
                    context={{
                        size: size,
                        value: this.props.value,
                        bgColor: this.props.bgColor,
                        fgColor: this.props.fgColor,
                        cells: qr(value).modules,
                    }}
                    render={renderCanvas}
                    style={{height: size, width: size}}
                />
            </View>
        );
    }
}