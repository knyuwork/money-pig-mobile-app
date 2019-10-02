export type ImagePickerResponse = {
  data: String,
  fileName: String,
  fileSize: Number,
  height: Number,
  width: Number,
  isVertical: Boolean,
  latitude: Number,
  longitude: Number,
  origURL: String,
  uri: String,
  timestamp: String,
}

export type FirebaseStoreUploadResponse = {
  bytesTransferred: Number,
  downloadURL: String,
  ref: String,
  state: String,
  totalBytes: Number,
  metadata: FirebaseStoreUploadResponseMetadata,
}

type FirebaseStoreUploadResponseMetadata = {
  bucket: String,
  contentDisposition: String,
  contentEncoding: String,
  contentType: String,
  generation: String,
  md5Hash: String,
  metageneration: String,
  name: String,
  timeCreated: String,
  updated: String,
  size: Number,
}

export type ProductDetail = {
  title: String,
  description: String,
  location: String,
  thumbnail: ImagePickerResponse,
}
