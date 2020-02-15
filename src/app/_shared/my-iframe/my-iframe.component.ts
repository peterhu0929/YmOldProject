import { Component, Input, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-iframe',
  templateUrl: './my-iframe.component.html',
  styles: ['iframe { margin-bottom: -4px; }']
})
export class MyIframeComponent implements OnInit {
  @Input() src: string;
  @ViewChild('frame') frameElement: ElementRef;
  containerMinWidth = 0;
  containerMinHeight = 0;
  containerWidth: number = this.containerMinWidth;
  containerHeight: number = this.containerMinHeight;
  ngOnInit() {
    this.onResize(window.innerWidth, window.innerHeight);
  }
  @HostListener('window:resize', ['$event.target.innerWidth', '$event.target.innerHeight'])
  onResize(width: number, height: number): void {
    let top = this.frameElement.nativeElement.offsetTop;
    let left = this.frameElement.nativeElement.offsetLeft;
    this.containerWidth = Math.max(width - left, this.containerMinWidth);
    this.containerHeight = Math.max(height - top, this.containerMinHeight);
  }
}
