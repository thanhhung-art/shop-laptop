import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  ButtonGroup,
} from "@mui/material";
import { useTypedSelector } from "../../app/store";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase/index";
import { setUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import DisplayToast, {notify} from "../DisplayToast";

const storage = getStorage(app);

export const AccountProfile = () => {
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.user.info);
  const [file, setFile] = useState<File>();
  const [linkToImage, setLinkToImage] = useState("");

  const loadFile = function (event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setLinkToImage(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  const handleClick = function () {
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // post data to server
            (async function () {
              const data = { img: downloadURL };
              const response = await fetch(`/api/users/${user._id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              const userInfo = await response.json();
              dispatch(setUser(userInfo));
              notify("Successfully updated profile picture");
            })();
          });
        }
      );
      setLinkToImage("");
    }
  };

  return (
    <>
      <DisplayToast />
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={linkToImage || user.img}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user.username}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <ButtonGroup disableElevation sx={{ width: "100%" }}>
            <Button fullWidth component="label">
              Upload picture
              <input type="file" hidden onChange={loadFile} accept="image/*" />
            </Button>
            <Button fullWidth disabled={!linkToImage} onClick={handleClick}>
              save image
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  );
};
