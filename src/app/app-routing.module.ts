import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Cm31070Component } from './programs/cm31070/cm31070.component';
import { Cm09020Component } from './programs/cm09020/cm09020.component';
import { Cm31010Component } from './programs/cm31010/cm31010.component';
import { Cm31010EditComponent } from './programs/cm31010/edit/edit.component';
import { Cm31010WAddComponent } from './programs/cm31010/cm31010w-add/CM31010W.component-add';
import { CM21010Component } from './programs/cm21010/cm21010.component';
import { CM21010dialogComponent } from './programs/cm21010/cm21010-dialog/cm21010.component-dialog';
import { AG00001Component } from './programs/ag00001/ag00001component';
import { AG00001detailComponent } from './programs/ag00001/ag00001-detail/ag00001.component-detail';
import { AG00001dialogComponent } from './programs/ag00001/ag00001-dialog/ag00001.component-dialog';
import { CM09005Component } from './programs/cm09005/cm09005component';
import { CM09005dialogComponent } from './programs/cm09005/cm09005-dialog/cm09005.component-dialog';
import { CM09005detailComponent } from './programs/cm09005/cm09005-detail/cm09005.component-detail';
import { CashComponent } from './programs/mvc/cash.component';
import { CM09005pdfComponent } from './programs/cm09005/cm09005-pdf/cm09005.component-pdf';
import { Cm09060Component } from './programs/cm09060/cm09060.component';
import { ExchRateProductionComponent } from './programs/exch-rate-production/exch-rate-production.component';

const routes: Routes = [{ path: 'cm31070', component: Cm31070Component },
{ path: 'cm09020', component: Cm09020Component },
{ path: 'cm31010', component: Cm31010Component },
{ path: 'cm31010EDIT', component: Cm31010EditComponent },
{ path: 'cm31010ADD', component: Cm31010WAddComponent },
{ path: 'cm21010', component: CM21010Component },
{ path: 'cm21010Dialog', component: CM21010dialogComponent },
{ path: 'ag00001', component: AG00001Component },
{ path: 'ag00001Detail', component: AG00001detailComponent },
{ path: 'ag00001Dialog', component: AG00001dialogComponent },
{ path: 'cm09005', component: CM09005Component },
{ path: 'cm09005Dialog', component: CM09005dialogComponent },
{ path: 'cm09005Pdf', component: CM09005pdfComponent },
{ path: 'cm09005Detail', component: CM09005detailComponent },
{ path: 'cm09060', component: Cm09060Component },
{ path: 'exchRate', component: ExchRateProductionComponent },
{
    path: 'cm11010w',
    component: CashComponent,
    data: {
        keyNo: 3833,
        pgType: 'M',
        pgName: 'CM11010W',
        url: 'CM11010W/Index'
    }
},
{
    path: 'cm11010w',
    component: CashComponent,
    data: {
        keyNo: 3773,
        pgType: 'M',
        pgName: 'CM11010W',
        url: 'CM11010W/Index'
    }
},
{
    path: 'cm11012w',
    component: CashComponent,
    data: {
        keyNo: 3894,
        pgType: 'M',
        pgName: 'CM11012W',
        url: 'CM11012W/Index'
    }
},
{
    path: 'cm11013w',
    component: CashComponent,
    data: {
        keyNo: 5138,
        pgType: 'M',
        pgName: 'CM11013W',
        url: 'CM11013W/Index'
    }
},
{
    path: 'cm11030w',
    component: CashComponent,
    data: {
        keyNo: 2013,
        pgType: 'W',
        pgName: 'CM11030W',
        url: '/acctapp/Src/CASH/CM11030W/Main.aspx'
    }
},
{
    path: 'cm11040w',
    component: CashComponent,
    data: {
        keyNo: 21,
        pgType: 'M',
        pgName: 'CM11040W',
        url: 'CM11040W/Index'
    }
},
{
    path: 'cm31030w',
    component: CashComponent,
    data: {
        keyNo: 24,
        pgType: 'W',
        pgName: 'CM31030W',
        url: '/acctapp/Src/CASH/CM31030W/Main.aspx'
    }
},
{
    path: 'cm32060w',
    component: CashComponent,
    data: {
        keyNo: 3213,
        pgType: 'M',
        pgName: 'CM32060W',
        url: 'CM32060W/Index'
    }
},
{
    path: 'cm41040w',
    component: CashComponent,
    data: {
        keyNo: 1223,
        pgType: 'W',
        pgName: 'CM41040W',
        url: '/acctapp/Src/CASH/CM41040W/Main.aspx'
    }
},
{
    path: 'cm51010w',
    component: CashComponent,
    data: {
        keyNo: 608,
        pgType: 'W',
        pgName: 'CM51010W',
        url: '/acctapp/Src/CASH/CM51010W/Main.aspx'
    }
},
{
    path: 'cm51060w',
    component: CashComponent,
    data: {
        keyNo: 1197,
        pgType: 'W',
        pgName: 'CM51060W',
        url: '/acctapp/Src/CASH/CM51060W/Main.aspx'
    }
},
{
    path: 'cm92035w',
    component: CashComponent,
    data: {
        keyNo: 4093,
        pgType: 'M',
        pgName: 'CM92035W',
        url: 'CM92035W/Index'
    }
},
{
    path: 'cm92060w',
    component: CashComponent,
    data: {
        keyNo: 4333,
        pgType: 'M',
        pgName: 'CM92060W',
        url: 'CM92060W/Index'
    }
},
{
    path: 'cm92100w',
    component: CashComponent,
    data: {
        keyNo: 2134,
        pgType: 'W',
        pgName: 'CM92100W',
        url: '/acctapp/Src/CASH/CM92100W/Main.aspx'
    }
},
{
    path: 'cm92100w',
    component: CashComponent,
    data: {
        keyNo: 4353,
        pgType: 'M',
        pgName: 'CM92100W',
        url: 'CM92100W/Index'
    }
},
{
    path: 'reuters_tmp',
    component: CashComponent,
    data: {
        keyNo: 6666,
        pgType: 'W',
        pgName: 'reuters_tmp',
        url: '/acctapp/Src/CASH/reuters_tmp/main.aspx'
    }
},
{
    path: 'reuters_product',
    component: CashComponent,
    data: {
        keyNo: 6667,
        pgType: 'W',
        pgName: 'reuters_product',
        url: '/acctapp/Src/CASH/reuters_product/main.aspx'
    }
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
