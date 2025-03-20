// Here we will export all the components
import { Table, Action, ActionColumn } from './table';
import { Modal } from './modal';
import { Button } from './button';
import { Input } from './input';
import {PlantDetailsPopup} from './detailsPlant';
import ProtectedRoute from './protect/protectRoute';

export { Table, Modal, Button, Input,
        PlantDetailsPopup,
        ProtectedRoute
        };
export type { Action, ActionColumn };
