import React, { Component } from 'react';
import Posts from '../../components/Posts/Posts'
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar'
import './ProfilePage.css'
import postsService from '../../services/postsService';
import userService from '../../services/userService'

class ProfilePage extends Component {
    // constructor() {
    //     super()
        // this.state = {
        state = {
            posts: [],
            triggerwords: this.props.triggerWords
        }

    handleUpdatePosts = async () => {
        const posts = await postsService.userIndex()
        this.setState({posts: posts})
    }

    handleAddTrigger = async (e) => {
        const user = await userService.addTrigger(e.target.name)
        this.props.handleUpdateUser(user)
        const triggerwords = this.props.triggerWords.filter(word => {
            return !this.props.user.triggerwords.includes(word)
        })
        this.setState({triggerwords: triggerwords})
    }

    async componentDidMount() {
        const posts = await postsService.userIndex()
        const user = await userService.getFullUser()
        this.props.handleUpdateUser(user)
        this.setState({posts: posts})
        // this.props.handleUpdateUser(user)
        // console.log(this.props.user)
    }

    render () {
        return (
            <div className='Profile'>
                <ProfileSideBar
                    user={this.props.user}
                    triggerWords={this.state.triggerwords}
                    handleAddTrigger={this.handleAddTrigger}
                />
                <Posts 
                    posts={this.state.posts}
                    user={this.props.user}
                    triggerWords={this.props.triggerWords}
                    handleUpdatePosts={this.handleUpdatePosts}
                    handleSubmit={this.props.handleSubmit}
                />
            </div>
        )
    }
 
}

export default ProfilePage;