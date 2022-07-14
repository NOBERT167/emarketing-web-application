import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core/";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import { getPost, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";
import ReactWhatsapp from "react-whatsapp";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [buttonText, setButtontext] = useState("copy");

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper
      style={{ padding: "20px", borderRadius: "15px", marginTop: "10rem" }}
      elevation={6}
    >
      <div className={classes.card}>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
        <div className={classes.section}>
          <Typography variant="h6" component="p">
            {post.title}
          </Typography>
          <Typography variant="h4" component="h5">
            Ksh {post.price}
          </Typography>
          {/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>{" "}
          <Typography variant="body1">
            Posted: {moment(post.createdAt).fromNow()}
          </Typography>
          <br />
          <Typography variant="h6">Seller: {post.name}</Typography>
          <div className={classes.contactDetails}>
            <div className="">
              Contact:{" "}
              <a
                href="tel:PHONE_NUM"
                style={{
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                {post.contact}
              </a>
            </div>
            <CopyToClipboard text={post.contact}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setButtontext("copied!");
                }}
              >
                {buttonText}
              </Button>
            </CopyToClipboard>
            <ReactWhatsapp
              number={post.contact}
              message={`Hello i am interested in ${post.title} you advertised on easy sell`}
            >
              <WhatsAppIcon
                variant="contained"
                fontSize="small"
                className={classes.button}
              />{" "}
            </ReactWhatsapp>
          </div>
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
