Audio = new FS.Collection("audio", {
  stores: [new FS.Store.FileSystem("audio", {path: "~/uploads"})]
});
