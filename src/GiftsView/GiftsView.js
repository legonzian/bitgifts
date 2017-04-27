import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { red500, green500 } from 'material-ui/styles/colors';

const styles = {
    btn: {
        submit: {
            marginTop: 50
        }
    }
}



export default class GiftsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gifts: [],
            url: '',
            asin: '',
            valid: true,
            floatingLabelText: 'Please enter an Amazon Product Link.',
        }
    }

    _onChange = (event, url) => {
        this.setState({
            url
        });
        this.validateURL(url);
    }

    _onSubmit = (event) => {
        if (this.state.valid) {
            var headers = new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/xml'
            });
            fetch(`http://bitgiftsaws.azurewebsites.net/contacts/${this.state.asin}`, {
            }).then((response) => response.json()).then(
                (response) => {
                    debugger;
                });

            let gift = {
                url: this.state.url,
                asin: this.state.asin,
                product: 'Product'
            }
            this.setState({
                gifts: this.state.gifts.concat(gift),
                url: '',
                asin: ''
            });
            this.validateURL('')
        }
    }

    validateURL(url) {
        var regex = RegExp("^(http[s]?://)?([\\w.-]+)(:[0-9]+)?/([\\w-%]+/)?(dp|gp|gp/product|exec/o‌​bidos/asin)/(\\w+/)?(\\w{10})(.*)?$");
        var m = url.match(regex);
        if (url === '') {
            this.setState({
                asin: '',
                valid: false,
                floatingLabelText: 'Please enter an Amazon Product Link.',
                floatingLabelStyle: {},
                floatingLabelStyleFocus: {},
                underlineStyle: {}
            })
        } else if (m) {
            this.setState({
                asin: m[7],
                valid: true,
                floatingLabelText: 'Valid!',
                floatingLabelStyle: { color: green500 },
                floatingLabelStyleFocus: { color: green500 },
                underlineStyle: { borderColor: green500 }
            })
        } else {
            this.setState({
                asin: '',
                valid: false,
                floatingLabelText: 'Please enter a valid Amazon Product Link.',
                floatingLabelStyle: { color: red500 },
                floatingLabelStyleFocus: { color: red500 },
                underlineStyle: { borderColor: red500 },
            });
        }
    }

    render() {
        return (
            <div>
                <hr />
                {this.state.gifts.map((gift, key) => {
                    return (
                        <TextField
                            key={key}
                            id={`${key}`}
                            value={gift.url}
                            disabled={true}
                            fullWidth={true}
                            floatingLabelText={gift.product}
                        />
                    )
                })}
                <div>
                    <TextField
                        value={this.state.url}
                        onChange={this._onChange}
                        fullWidth={true}
                        floatingLabelText={this.state.floatingLabelText}
                        floatingLabelStyle={this.state.floatingLabelStyle}
                        floatingLabelFocusStyle={this.state.floatingLabelFocusStyle}
                        underlineStyle={this.state.underlineStyle}
                    />
                </div>
                <div>
                    <RaisedButton
                        label={'Add Product'}
                        onClick={this._onSubmit}
                        fullWidth={true}
                        disabled={!this.state.valid}
                    />
                </div>
                <hr />
                <div style={styles.btn.submit}>
                    <RaisedButton
                        label='Order Gifts'
                        primary={true}
                        fullWidth={true}
                    />
                </div>
                <div>
                    <h2>Debug:</h2>
                    <p>
                        url: {this.state.url}
                    </p>
                    <p>
                        asin: {this.state.asin}
                    </p>
                    <p>
                        gifts: {this.state.gifts.length}
                    </p>
                </div>
            </div>
        )
    }
}
