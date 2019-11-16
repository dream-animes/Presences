var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let iframe = new iFrame();
iframe.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.querySelector("video[id$='_html5_api']") != null || document.querySelector("div.jw-media.jw-reset > video") != null) {
        var video = document.querySelector("video[id$='_html5_api']") != null
            ? document.querySelector("video[id$='_html5_api']") : document.querySelector("div.jw-media.jw-reset > video");
        if (video != null && !isNaN(video.duration)) {
            iframe.send({
                duration: video.duration,
                currentTime: video.currentTime,
                paused: video.paused
            });
        }
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBRWxDLElBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLElBQUksSUFBSSxFQUFFO1FBQ2hJLElBQUksS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLElBQUksSUFBSTtZQUN0RixDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDOUcsSUFBRyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNYLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtnQkFDeEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUM5QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07YUFDcEIsQ0FBQyxDQUFBO1NBQ0Y7S0FDRDtBQUNGLENBQUMsQ0FBQSxDQUFDLENBQUMifQ==