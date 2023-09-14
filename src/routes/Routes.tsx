import InputSoundQuestion from "../pages/InputSoundQuestionPage";
import SelectSoundQuestion from "../pages/SelectSoundQuestionPage";
import SelectSymbolQuestion from "../pages/SelectSymbolQuestionPage";
import SelectSoundQuestionAudio from "../pages/SelectSymbolQuestionPageAudio";
import SymbolSelectionPage from "../pages/SymbolSelectionPage";
import NotFound from "./404";

interface Routes {
  id: number;
  path: string;
  element: React.ReactNode;
}

const routes: Routes[] = [
  {
    id: 1,
    path: "/",
    element: <SymbolSelectionPage />,
  },
  {
    id: 2,
    path: "/training",
    element: <InputSoundQuestion />,
  },
  {
    id: 3,
    path: "/trainingSound",
    element: <SelectSoundQuestion />,
  },
  {
    id: 4,
    path: "/trainingSymbol",
    element: <SelectSymbolQuestion />,
  },
  {
    id: 5,
    path: "/trainingSoundAudio",
    element: <SelectSoundQuestionAudio />,
  },
  {
    id: 6,
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
