import React, { Component } from 'react'
import Share from './presenter'

class Container extends Component {
    componentDidMount() {
        // Facebook SDK
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '492504484484057',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    // Twitter function
    shareOnTwitter = (url, text) => {
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`)
    }

    downloadImage = () => {
        const link = document.createElement("a")
        link.download = 'fit-flowers'
        link.href = this.props.downloadURL
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    render() {
        return <Share {...this.props} downloadImage={this.downloadImage} shareOnTwitter={this.shareOnTwitter} />
    }
}

export default Container
