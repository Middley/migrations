import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { PrintSettingService } from '@cad-private/smart-printing/print-settings/shared/services/printSetting-service.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FileFlatNode } from '../shared/models/DropDrag.model';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GetCategoriesMasterDetailResponseDTO } from '../shared/models/GetCategoriesMasterDetailResponseDTO.Model';
import { CreateServiceCenterAndCategoriesRequestDTO } from '../shared/models/Create/CreateServiceCenterAndCategoriesRequestDTO.Model';
import { CreateServiceCenterAndCategoryCommand } from '../shared/models/Create/CreateServiceCenterAndCategoryCommand.model';
import { UnsuscribeServiceCenterAndCategoryByIdCommand } from '../shared/models/Update/UnsuscribeServiceCenterAndCategoryByIdCommand.Model';
import { ServiceCenterAndCategoriesService } from '../shared/service-center-and-categories.service';



@Component({
    selector: 'cad-association-service-center-and-categories',
    templateUrl: './association-service-center-and-categories.component.html',
    styleUrls: ['./association-service-center-and-categories.component.scss']
})
export class AssociationServiceCenterAndCategoriesComponent implements OnInit {
    form: FormGroup;
    establishments: any[];
    categories: any[] = [];
    serviceCenters: any[] = [];

    treeControl: FlatTreeControl<FileFlatNode>;
    treeFlattener: MatTreeFlattener<GetCategoriesMasterDetailResponseDTO, FileFlatNode>;

    dataSource: MatTreeFlatDataSource<GetCategoriesMasterDetailResponseDTO, FileFlatNode>;

    expansionModel = new SelectionModel<string>(true);
    dragging = false;
    expandTimeout: any;
    expandDelay = 1000;
    validateDrop = false;

    dataChange = new BehaviorSubject<GetCategoriesMasterDetailResponseDTO[]>([]);

    get data(): GetCategoriesMasterDetailResponseDTO[] { return this.dataChange.value; }

    LIST_IDS: any[] = [];
    constructor(private dateAdapter: DateAdapter<Date>, private _fb: FormBuilder,
        private printSettingService: PrintSettingService, private serviceCentersAndCategories: ServiceCenterAndCategoriesService) {
        this.dateAdapter.setLocale('es-CL');
        this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
            this._isExpandable, this._getChildren);
        this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    }

    transformer = (node: GetCategoriesMasterDetailResponseDTO, level: number) => {
        return new FileFlatNode(!!node.subCategories, node.name, level, node.type, node.id);
    };
    private _getLevel = (node: FileFlatNode) => node.level;
    private _isExpandable = (node: FileFlatNode) => node.expandable;
    private _getChildren = (node: GetCategoriesMasterDetailResponseDTO): Observable<GetCategoriesMasterDetailResponseDTO[]> => observableOf(node.subCategories);
    hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

    // DRAG AND DROP METHODS
    shouldValidate(event: MatCheckboxChange): void {
        this.validateDrop = event.checked;
    }
    /**
   * This constructs an array of nodes that matches the DOM
   */
    visibleNodes(): GetCategoriesMasterDetailResponseDTO[] {
        const result = [];

        function addExpandedChildren(node: GetCategoriesMasterDetailResponseDTO, expanded: string[]) {
            result.push(node);
            if (expanded.includes(node.id)) {
                node.subCategories.map((child) => addExpandedChildren(child, expanded));
            }
        }
        this.dataSource.data.forEach((node) => {
            addExpandedChildren(node, this.expansionModel.selected);
        });
        return result;
    }

    /**
  * Handle the drop - here we rearrange the data based on the drop event,
  * then rebuild the tree.
  * */
    drop(event: CdkDragDrop<any>, idServiceCenter: number) {

        //Ignore drops on same container
        if (event.container == event.previousContainer) return;

        // ignore drops outside of the tree
        if (!event.isPointerOverContainer) return;

        //Update Database
        var createServiceCenterCategory = new CreateServiceCenterAndCategoriesRequestDTO();
        createServiceCenterCategory.IdCategory = event.item.data.id;
        createServiceCenterCategory.IdCentroAtencion = idServiceCenter;

        var wrapper = new CreateServiceCenterAndCategoryCommand();
        wrapper.ServiceCenterAndCategories = createServiceCenterCategory;
        this.serviceCentersAndCategories.createServiceCenterAndCategories(wrapper).subscribe(res => {
            this.getServiceCentersAndCategories();
        }, error => {
        });
    }
    /**
     * Experimental - opening tree nodes as you drag over them
     */
    dragStart() {
        this.dragging = true;
    }
    dragEnd() {
        this.dragging = false;
    }
    dragHover(node: FileFlatNode) {
        if (this.dragging) {
            clearTimeout(this.expandTimeout);
            this.expandTimeout = setTimeout(() => {
                this.treeControl.expand(node);
            }, this.expandDelay);
        }
    }
    dragHoverEnd() {
        if (this.dragging) {
            clearTimeout(this.expandTimeout);
        }
    }

    /**
     * The following methods are for persisting the tree expand state
     * after being rebuilt
     */
    rebuildTreeForData(data: any, dataSource: any) {
        dataSource.data = data;
        this.expansionModel.selected.forEach((id) => {
            const node = this.treeControl.dataNodes.find((n) => n.id === id);
            this.treeControl.expand(node);
        });
    }

    /**
     * Not used but you might need this to programmatically expand nodes
     * to reveal a particular node
     */
    private expandNodesById(flatNodes: FileFlatNode[], ids: string[]) {
        if (!flatNodes || flatNodes.length === 0) return;
        const idSet = new Set(ids);
        return flatNodes.forEach((node) => {
            if (idSet.has(node.id)) {
                this.treeControl.expand(node);
                let parent = this.getParentNode(node);
                while (parent) {
                    this.treeControl.expand(parent);
                    parent = this.getParentNode(parent);
                }
            }
        });
    }

    private getParentNode(node: FileFlatNode): FileFlatNode | null {
        const currentLevel = node.level;
        if (currentLevel < 1) {
            return null;
        }
        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];
            if (currentNode.level < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }


    ngOnInit(): void {
        this.reactiveForm();
        this.getSettings();
    }


    getServiceCentersAndCategories() {
        this.serviceCentersAndCategories.getServiceCentersAndCategoriesByEstaBlishment(this.form.controls.establishment.value).subscribe(res => {
            //Get Data
            this.categories = [];
            this.serviceCenters = [];
            this.categories = res.data.categories;
            this.serviceCenters = res.data.serviceCenters;
            //handle categories
            this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
            this.dataChange.subscribe(data => this.rebuildTreeForData(this.categories, this.dataSource));
            //handle serviceCenters
            this.serviceCenters.forEach((sc) => {
                if (sc.categories != null) {
                    sc.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
                    this.dataChange.subscribe(data => this.rebuildTreeForData(sc.categories, sc.dataSource));
                }
            });
            this.setIdDragDropContainer();

        }, error => {
            console.log(error);
        });



    }
    setIdDragDropContainer() {
        this.LIST_IDS = [];
        this.serviceCenters.forEach((sc) => {
            this.LIST_IDS.push(sc.id.toString());
        });
    }

    ngOnChanges(): void {
    }

    getSettings() {
        this.printSettingService.getAllSettings().subscribe(res => {
            this.establishments = res.establisments;
            this.setDefaultValueMasters('establishment', this.establishments, this.establishments[0].name);
            this.getServiceCentersAndCategories();
        });
    }

    reactiveForm() {
        this.form = this._fb.group({
            establishment: new FormControl('', [Validators.required]),
        });
    }

    selectedEstablishment(event) {
    }

    setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
        const toSelect = masterDetails.find(c => c.name == searchValue);
        this.form.get(nameControl).setValue(toSelect.id);
    }

    deleteCategorie(categorieId: number, serviceCenterId: number) {
        var request = new UnsuscribeServiceCenterAndCategoryByIdCommand();
        request.idCategorie = categorieId;
        request.idServiceCenter = serviceCenterId;

        this.serviceCentersAndCategories.unSuscribeServiceCenterAndCategorie(request).subscribe(res => {
            this.getServiceCentersAndCategories();
        }, error => {
        });
    }
}
