import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { Student } from 'src/app/models';
import { CHART_LABELS_BACKGROUND_COLORS, CHART_LABELS_BORDER_COLORS } from 'src/app/shared/constants';
import { SortClassDegreeFn } from 'src/app/shared/utils/list.util';
import DegreesList from 'src/mock-data/degrees.json';
Chart.register(BarElement, BarController, CategoryScale, LinearScale);
@Component({
  selector: 'app-students-chart-modal',
  templateUrl: './students-chart-modal.component.html',
  styleUrls: ['./students-chart-modal.component.scss'],
})
export class StudentsChartModalComponent implements OnInit {
  private chartConfig = {
    type: 'bar',
    data: {
      labels: DegreesList.sort(SortClassDegreeFn).map((item) => item.name),
      datasets: [
        {
          label: 'Qtd. Alunos',
          data: [],
          borderColor: CHART_LABELS_BORDER_COLORS,
          backgroundColor: CHART_LABELS_BACKGROUND_COLORS,
          borderWidth: 1,
        },
      ],
    },
  } as any;
  constructor(
    public dialogRef: MatDialogRef<StudentsChartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student[]
  ) {}

  ngOnInit(): void {
    this.chartConfig.data.datasets[0].data = DegreesList.sort(SortClassDegreeFn).map(
      (degree) => this.data.filter((item) => item.degree.id === degree.id).length
    );
    const chart = new Chart('students-chart', this.chartConfig);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
